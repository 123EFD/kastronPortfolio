//map markdown files and list them
import React from 'react';
import { Link } from 'react-router-dom';
import { MarkdownRenderer } from '../../components/Markdown/MarkdownRenderer';
import { useEffect, useState } from 'react';
import fm from 'front-matter';

export const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //to get the list of posts from github
    const fetchLivePosts = async () => {
      try {
        const owner = import.meta.env.VITE_ADMIN_GITHUB_USERNAME;
        const repo = "kastronPortfolio";
        const path_to_blog_folder = "src/content/blog";
        const timeStamp = Date.now(); 
        const repoUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path_to_blog_folder}?timestamp=${timeStamp}`; 

        //fetch the list of files in the directory, pass github token in headeers to avoid rate limiting
        const response = await fetch(repoUrl, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
          }
        });

        if (!response.ok) throw new Error (`Failed to fetch posts from GitHub: ${response.status} ${response.statusText}`);

        const directoryFiles = await response.json();

        //filter the array to ONLY include files that end with '.md'
        const markdownFiles = directoryFiles.filter(file => file.name.endsWith('.md'));

        //fetch the raw text for every file simultaneously
        const parsedPosts = await Promise.all(
          markdownFiles.map(async (file) => {
            const rawResponse = await fetch(`${file.download_url}?t=${timeStamp}`);
            const rawContent = await rawResponse.text();
            const parsed = fm(rawContent);
            const rawDate = parsed.attributes.date || file.name;
            const date = new Date(rawDate).toLocaleDateString('en-US', {
              year : 'numeric',
              month: 'long',
              day : 'numeric'
            }); // Format date as YYYY-MM-DD

            const slug = file.name.replace('.md', '');
            const finalTitle = parsed.attributes.title ? parsed.attributes.title : slug;
            
            //flatten the object to let JSX read
            return {
              slug: slug,
              title: finalTitle,
              date: date,
              description: parsed.attributes.description || 'No description available.',
              tags: parsed.attributes.tags || [],
              _rawSortDate: new Date(rawDate).getTime()
            };
          })
        );

        //sort the array of parsed posts by date (newest first)
        const sortedArray = parsedPosts.sort((a, b) => b._rawSortDate - a._rawSortDate);

        setPosts(sortedArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts from GitHub:', error);
        setIsLoading(false);
      }
    };

    fetchLivePosts();  
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 py-24 px-4 transition-colors duration-500 pt-32">
      <div className="max-w-5xl mx-auto border border-dashed border-border p-6 rounded-xl bg-background">
        <h1 className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded mb-4 inline-block">
          Engine Sandbox Preview
        </h1>

        {isLoading ? ( <p>Loading live posts from GitHub...</p> ) 
        : (
          <>
            {/* The Glassmorphism Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className="group flex flex-col h-full bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium tracking-wide">
                  {post.date}
                </p>

                <p className="text-slate-700 dark:text-slate-300 mb-6 flex-grow leading-relaxed">
                  {post.description}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
            </div>
          </>
        )}

        {posts.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 mt-12 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-2xl p-12 border border-white/20 dark:border-white/10">
            <p className="text-xl">No posts published yet. Head to the dashboard to write your first entry!</p>
          </div>
        )}
      </div>
    </div>
  );
}