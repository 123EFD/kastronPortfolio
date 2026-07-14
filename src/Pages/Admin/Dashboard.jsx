//private route for Milkdown editor role
import {supabase} from '../../lib/supabaseClient';
//react-router-dom for navigate to logout
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
    const navigate = useNavigate();

    //hold the lsit of md files
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGithubPosts = async () => {
            try {
                //get current session 
                const { data: {session} } = await supabase.auth.getSession();

                //extract the Github provider from session obj
                const githubToken  = session?.provider_token;
                if (!githubToken) throw new Error("No GitHub token found.");

                //define github repo details
                const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME; // Replace with your GitHub username
                const repo = 'kastronPortfolio';
                const path = 'src/content/blog';

                //construct the github api url 
                const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

                //write fetch() request, include authorization header and github api accept header
                const response = await fetch(url, {
                    headers: {
                        Authorization : `Bearer ${githubToken}`,
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
            
            await supabase.auth.signOut();
        
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

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
                        <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
                            + New Post
                        </button>
                    </div>
                    
                    {isLoading ? (
                        <p className="text-sm text-muted-foreground">Loading repository files...</p>
                    ) : (
                        <ul className="space-y-3">
                            {/* HINT 6: Map through your `posts` array here. 
                                GitHub returns an object for each file containing properties like `name` and `sha`.
                                Render a list item for each file showing its name. */}
                                {posts.map((post) => (
                                    <li
                                        key={post.sha}
                                        className="flex justify-between items-center p-3 border border-border rounded-md hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Clean up the display name by stripping the .md extension */}
                                        <span className="font-medium text-sm text-foreground">
                                            {post.name.replace('.md', '')}
                                        </span>

                                        <button className="text-xs text-primary hover:text-primary/80 font-semibold transition-colors">
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
                    <p className="text-muted-foreground text-center">
                        Select a post from the sidebar or create a new one to open the Milkdown editor.
                    </p>
                </div>
            </div>
        </div>
    );
};