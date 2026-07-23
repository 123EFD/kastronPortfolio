//private route for Milkdown editor role
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { uploadFile } from '../../lib/githubUploader';
import { MilkdownProvider } from '@milkdown/react';
import { MilkdownEditor } from '../../components/Editor/MilkdownEditor';
import matter from 'gray-matter';

export const Dashboard = () => {
    const navigate = useNavigate();

    //hold the lsit of md files
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFile, setCurrentFile] = useState(null);
    const [editContent, setEditorContent] = useState('');
    const [isFetchingFile, setIsFetchingFile] = useState(false);
    const [githubToken, setGithubToken] = useState(() => sessionStorage.getItem('github_token') || null);
    const [frontmatter, setFrontmatter] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]); 

    useEffect(() => {
        const fetchGithubPosts = async () => {
            try {
                //get current session 
                const { data: { session } } = await supabase.auth.getSession();

                //extract the Github provider from session obj
                const token = session?.provider_token || sessionStorage.getItem('github_token');

                if (!token) {
                    console.warn("No GitHub token found. Redirecting to login...");
                    sessionStorage.removeItem('github_token');
                    await supabase.auth.signOut();
                    navigate('/');
                    return;
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
                        Authorization: `Bearer ${token}`,
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
                setPosts([]); //leave the post empty so that dashboard wont crash
            } finally {
                setIsLoading(false);
            }
        };
        fetchGithubPosts();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            sessionStorage.clear();
            localStorage.clear();
      
            await supabase.auth.signOut();
            window.location.href = '/'; // Redirect to the homepage after logout
        } catch (error) {
            console.error('Error during logout:', error);
            window.location.href = '/'; // Redirect to the homepage even if there's an error
        }
    };

    const handleNewPost = () => {
        const uniqueTime = Date.now();
        setCurrentFile({
            name: `untitled-${uniqueTime}.md`,
            sha: `new-draft-${uniqueTime}`, //unique key for localStorage
        });

        setFrontmatter({
            title: `Draft: ${uniqueTime}`, 
            date: new Date().toISOString().split('T')[0], 
            description: "A quick description..."
        })
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

            //use gray-matter to parse the rawText into an object with the YAML obj. & markdown body
            const parsedDocument = matter(rawText);

            //store the YAML data 
            setFrontmatter(parsedDocument.data);

            //convert github's html back into editor shortcuts
            let markdownBody = parsedDocument.content;

            //pass only the mardown body into editor
            setEditorContent(markdownBody);
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

            //merge the text and the YAML object back into a single string.
            const result = matter.stringify(latestContent, frontmatter);

            // Construct the destination path
            const path = `src/content/blog/${currentFile.name}`;

            //publish to GitHub using utility function
            const updatedFile = currentFile.sha.startsWith('new-draft-') ? null : currentFile.sha;
            await uploadFile(result, path, githubToken, updatedFile);
            alert('Post published successfully!');

            // Clear the draft from localStorage after successful publish
            localStorage.removeItem(`draft-${currentFile.sha}`);
        } catch (error) {
            console.error('Error publishing post:', error);
            alert('Failed to publish post. Please try again.');
        }
    }

    const handleDeletePost = async (fileToDelete) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${fileToDelete.name}"? This action cannot be undone.`);
        if (!confirmDelete) return;

        //handle local drafts 
        if (!fileToDelete.sha.startsWith('new-draft-')) {
            setPosts((prev) => prev.filter(p => p.sha !== fileToDelete.sha));
            localStorage.removeItem(`draft-${fileToDelete.sha}`);
            if (currentFile?.sha === fileToDelete.sha) setCurrentFile(null);
            return;
        }

        //handle published github files
        try {
            const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME;
            const repo = 'kastronPortfolio';
            const path = `src/content/blog/${fileToDelete.name}`;
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

            const response = await fetch(url, {
                method : 'DELETE',
                headers : {
                    Authorization : `Bearer ${githubToken}`,
                    Accept: 'application/vnd.github.raw+json',
                },
                body : JSON.stringify({
                    message: `Delete post : ${fileToDelete.name}`,
                    sha : fileToDelete.sha,
                })
            });

            if (!response.ok) throw new Error(`Failed to delete file: ${response.statusText}`);

            //cleaup state and local storage
            setPosts((prev) => prev.filter(p => p.sha !== fileToDelete.sha));
            localStorage.removeItem(`draft-${fileToDelete.sha}`);

            //close editor if deleted file is currently open
            if (currentFile?.sha === fileToDelete.sha) setCurrentFile(null);

            alert(`Post "${fileToDelete.name}" deleted successfully!`);
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    //toggle a single checkbox
    const toggleSelection = (sha) => {
        setSelectedFiles((prev) => 
            prev.includes(sha) ? prev.filter(id => id !== sha) : [...prev, sha]
        );
    };

    //select / deselect all
    const toggleSelectAll = () => {
        if (selectedFiles.length === posts.length) {
            setSelectedFiles([]); //deselect all
        } else {
            setSelectedFiles(posts.map(post => post.sha)); // select all
        }
    };

    //bulk delete logic
    const handleBulkDelete = async () => {
        if (selectedFiles.length === 0) return;

        const confirmedDelete = window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected post(s)? This action cannot be undone.`);
        if (!confirmedDelete) return;

        //get actual file obj. based on the selected SHAs
        const filesToDelete = posts.filter(post => selectedFiles.includes(post.sha));

        //avoid promise.all to prevent hitting github rate limit, delete one by one
        for (const file of filesToDelete) {
            if (file.sha.startsWith('new-draft-')){
                //delete local draft 
                localStorage.removeItem(`draft-${file.sha}`);
            } else {
                try {
                    const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME; 
                    const repo = 'kastronPortfolio';
                    const path = `src/content/blog/${file.name}`;
                    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

                    await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${githubToken}`,
                            Accept: 'application/vnd.github.v3+json',
                        },
                        body: JSON.stringify({
                            message: `Bulk delete post: ${file.name}`,
                            sha: file.sha
                        })
                    });
                    localStorage.removeItem(`draft-${file.sha}`);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }

            //if user deleted the file they're currently editing, close the editor
            if (currentFile?.sha === file.sha) {
                setCurrentFile(null);
                setEditorContent('');
            }
        }
        //update the UI by filtering out  all deleted files
        setPosts((prev) => prev.filter(post => !selectedFiles.includes(post.sha)));
        setSelectedFiles([]); //clear selection after deletion
        alert(`${filesToDelete.length} post(s) deleted successfully!`);
    };

    const handleRenamePost = async (fileToRename) => {
        const newName = window.prompt("Enter new file name (must end in .md): ", fileToRename.name);

        if (!newName || newName === fileToRename.name) return;

        if (!newName.endsWith('.md')) {
            alert("File name must end with .md");
            return;
    }

    //handle local drafts by updating React state
    if (fileToRename.sha.startsWith('new-draft-')) {
        setCurrentFile(prev => ({ ...prev, name: newName }));
        return;
    }

    //handle published github files
    alert("To rename a published file, update the title here, hit 'Publish to GitHub' to create the new file, and then delete the old file.");
    setCurrentFile(prev => ({ ...prev, name: newName, isRenaming: true }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 transition-colors duration-500">
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
                <div className="col-span-1 p-6 rounded-2xl shadow-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Your Posts</h2>
                        <button 
                            onClick={handleNewPost}
                            className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
                        >
                            + New Post
                        </button>
                    </div>

                    {/* Bulk Actions Toolbar (Only shows if there are posts) */}
                    {posts.length > 0 && (
                        <div className="flex justify-between items-center mb-4 p-2 bg-white/50 dark:bg-black/30 rounded-lg border border-white/20 dark:border-white/5">
                            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    checked={selectedFiles.length === posts.length && posts.length > 0}
                                    onChange={toggleSelectAll}
                                />
                                Select All
                            </label>
                            
                            {selectedFiles.length > 0 && (
                                <button 
                                    onClick={handleBulkDelete}
                                    className="text-xs font-semibold px-3 py-1 bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-md transition-colors"
                                >
                                    Delete Selected ({selectedFiles.length})
                                </button>
                            )}
                        </div>
                    )}

                    {isLoading ? (
                        <p className="text-sm text-muted-foreground">Loading repository files...</p>
                    ) : (
                        <ul className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                            {posts.map((post) => (
                                <li
                                    key={post.name}
                                    className={`flex items-center justify-between p-3 border rounded-xl transition-all shadow-sm group backdrop-blur-md
                                        ${currentFile?.sha === post.sha 
                                            ? 'bg-blue-500/20 border-blue-400 dark:bg-blue-900/40 dark:border-blue-700' 
                                            : 'bg-white/30 border-white/40 hover:bg-white/50 dark:bg-black/30 dark:border-white/10 dark:hover:bg-black/50'}
                                    `}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        {/* Checkbox */}
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                                            checked={selectedFiles.includes(post.sha)}
                                            onChange={() => toggleSelection(post.sha)}
                                        />

                                        {/* Clean up the display name by stripping the .md extension */}
                                        <span className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate cursor-pointer" onClick={() => handleEditPost(post)}>
                                            {post.name.replace('.md', '')}
                                            {/* Draft Badge */}
                                            {post.sha.startsWith('new-draft-') && (
                                                <span className="ml-2 text-[10px] uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-sm">Draft</span>
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleEditPost(post)} 
                                            className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                                            title="Edit"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            onClick={() => handleRenamePost(post)} 
                                            className="text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform"
                                            title="Rename"
                                        >
                                            🔄
                                        </button>
                                        <button 
                                            onClick={() => handleDeletePost(post)} 
                                            className="text-red-500 hover:scale-110 transition-transform"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
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
                                <div className="col-span-1 md:col-span-2 p-6 min-h-[600px] flex flex-col rounded-2xl shadow-xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-lg">
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