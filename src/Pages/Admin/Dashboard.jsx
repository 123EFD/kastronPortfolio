//private route for Milkdown editor role
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { uploadFile } from '../../lib/githubUploader';
import { MilkdownProvider } from '@milkdown/react';
import { MilkdownEditor } from '../../components/Editor/MilkdownEditor';

export const Dashboard = () => {
    const navigate = useNavigate();

    //hold the lsit of md files
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);
    const [editContent, setEditorContent] = useState('');
    const [isFetchingFile, setIsFetchingFile] = useState(false);
    const [githubToken, setGithubToken] = useState(() => sessionStorage.getItem('github_token') || null);

    useEffect(() => {
        const fetchGithubPosts = async () => {
            try {
                //get current session 
                const { data: { session } } = await supabase.auth.getSession();

                //extract the Github provider from session obj
                const token = session?.provider_token || sessionStorage.getItem('github_token');
                if (!token) {
                    sessionStorage.removeItem('github_token');
                    throw new Error("GitHub token not found in session or localStorage.");
                }

                //set the token into state 
                sessionStorage.setItem('github_token', token); //token persist after page refresh
                setGithubToken(token);

                //define github repo details
                const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME; // Replace with your GitHub username
                const repo = 'kastronPortfolio';
                const path = 'src/content/blog';

                //construct the github api url 
                const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

                //write fetch() request, include authorization header and github api accept header
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${githubToken}`,
                        Accept: 'application/vnd.github.raw+json'
                    }
                });

                if (response.status === 404) {
                    setPosts([]);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.statusText}`);
                }

                //paerse the response and update the `posts` state
                const data = await response.json();
                const mdFiles = data.filter(file => file.name.endsWith('.md'));
                setPosts(mdFiles);
            } catch (error) {
                console.error('Error fetching posts from GitHub:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGithubPosts();
    }, []);

    const handleLogout = async () => {
        try {
            sessionStorage.removeItem('github_token');
            await supabase.auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleNewPost = () => {
        setCurrentFile({
            name: `untitled-${Date.now()}.md`,
            sha: `new-draft-${Date.now()}`, //unique key for localStorage
        });
        setEditorContent('# New Blog Post\n\nStart writing here...');
    };

    const handleEditPost = async (file) => {
        setIsFetchingFile(true);
        setCurrentFile(file); // Stores the file metadata (name, sha, download_url)

        try {
            if (!githubToken) throw new Error("GitHub token is missing from state.");
            //note : use file.url instead using .download_url which is raw CDN that cause CORS 
            const response = await fetch(file.url, {
                headers: { Authorization: `Bearer ${githubToken}`,
                Accept : 'application/vnd.github.raw+json'
            }
        });

            if (!response.ok) {
                throw new Error(`Failed to fetch file content: ${response.statusText}`);
            }

            const rawText = await response.text();
            setEditorContent(rawText);
        } catch (error) {
            console.error('Error fetching file content:', error);
        } finally {
            setIsFetchingFile(false);
        }
    }

    const handlePublish = async () => {
        if (!currentFile) return;

        try {
            //pull most recent content from localStorage
            const latestContent = localStorage.getItem(`draft-${currentFile.sha}`);
            if (!latestContent) {
                alert('No changes to save!');
                return;
            }

            if (!githubToken) throw new Error("No GitHub token found.");

            // Construct the destination path
            const path = `src/content/blog/${currentFile.name}`;

            //publish to GitHub using utility function
            const updatedFile = currentFile.sha.startsWith('new-draft-') ? null : currentFile.sha;
            await uploadFile(latestContent, path, githubToken, updatedFile);
            alert('Post published successfully!');

            // Clear the draft from localStorage after successful publish
            localStorage.removeItem(`draft-${currentFile.sha}`);
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please try again.');
        }
    }

    return (
        <div className="container mx-auto max-w-5xl py-24 px-4">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold text-primary">Creator Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-md transition-colors"
                >
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar for Drafts / Published Lists */}
                <div className="col-span-1 bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Your Posts</h2>
                        <button 
                            onClick={handleNewPost}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
                        >
                            + New Post
                        </button>
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-muted-foreground">Loading repository files...</p>
                    ) : (
                        <ul className="space-y-3">
                            {posts.map((post) => (
                                <li
                                    key={post.sha}
                                    className="flex justify-between items-center p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                                >
                                    {/* Clean up the display name by stripping the .md extension */}
                                    <span className="font-medium text-sm text-foreground">
                                        {post.name.replace('.md', '')}
                                    </span>

                                    <button 
                                        onClick={() => handleEditPost(post)}
                                        className="text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
                                    >
                                        Edit
                                    </button>
                                </li>
                            ))}

                            {posts.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">No posts found in directory.</p>
                            )}
                        </ul>
                    )}
                </div>

                {/* Main Editor Area (Placeholder for Next Step) */}
                <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-lg p-6 min-h-[500px] flex items-center justify-center">
                    {/* Conditional Rendering: If a file is selected, show the editor. Otherwise, show placeholder. */}
                    {!currentFile ? (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-muted-foreground text-center">
                                Select a post from the sidebar or create a new one to open the Milkdown editor.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full gap-4">
                            {/* Editor Header & Save Button */}
                            <div className="flex justify-between items-center border-b border-border pb-4">
                                <h2 className="text-xl font-semibold">Editing: {currentFile.name}</h2>
                                <button
                                    onClick={handlePublish}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded shadow transition-colors"
                                >
                                    Publish to GitHub
                                </button>
                            </div>

                            {/* The Actual Editor */}
                            {isFetchingFile ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-muted-foreground animate-pulse">Fetching file from GitHub...</p>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto">
                                    {/* The MilkdownProvider is MANDATORY to prevent crashes */}
                                    <MilkdownProvider>
                                        <MilkdownEditor
                                            initialText={editContent}
                                            file={currentFile}
                                            githubToken={githubToken}
                                        />
                                    </MilkdownProvider>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};