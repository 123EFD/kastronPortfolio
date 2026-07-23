import React,  { useEffect , useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MarkdownRenderer } from '../../components/Markdown/MarkdownRenderer';
import fm from 'front-matter';

//grab the filename slug from the URL
export const BlogPost = () => {
    const {slug} = useParams();
    const [postContent, setPostContent] = useState('');
    const [metadata, setMetadata] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const owner  = import.meta.env.VITE_ADMIN_GITHUB_USERNAME;
          const repo = "kastronPortfolio";
          const path = `src/content/blog/${slug}.md`;
          const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
          const response = await fetch(url, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
          });

          if (!response.ok) throw new Error(`Failed to fetch post from GitHub: ${response.status} ${response.statusText}`);

          //parse as json then decode
          const data = await response.json();
          let rawMarkdown = decodeURIComponent(escape(atob(data.content)));
          //normalize built-in system line break styles
          rawMarkdown = rawMarkdown.replace(/\r\n/g, '\n');
          const parsed = fm(rawMarkdown);
          setMetadata(parsed.attributes);

          if (!parsed.body || parsed.body.trim() === '') {
            const parts = rawMarkdown.split('---\n');
            if (parts.length >= 3) {
              setPostContent(parts.slice(2).join('---\n').trim());
            } else {
              setPostContent(rawMarkdown);
            }
          } else {
            setPostContent(parsed.body);
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading blog post: ', error);
          setPostContent("Error loading post content. It may have been deleted or moved");
          setIsLoading(false);
        }
      };
      fetchPost();
    }, [slug]);

    if (isLoading) {
      return <div className="min-h-screen pt-32 text-center text-xl">Loading post...</div>;
    }

    return (
        <div className="min-h-screen paper-texture py-24 px-4 transition-colors duration-500 pt-32">
            <div className="max-w-4xl mx-auto bg-white/70 dark:bg-black/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/30 dark:border-white/10">
                
                {/* Back Button */}
                <Link to="/blog" className="text-primary hover:underline mb-8 inline-block">
                    &larr; Back to Blog
                </Link>

                {/* Dynamic Post Header */}
                <header className="mb-12 border-b border-border pb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        {metadata.title || slug}
                    </h1>
                    
                    {/* Render the date if it exists */}
                    {metadata.date && (
                        <p className="text-muted-foreground font-medium">
                            {new Date(metadata.date).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    )}
                </header>

                {/* The Markdown Body */}
                <div className="prose dark:prose-invert max-w-none">
                    {/* 🚀 Pass the parsed body directly into your custom Unified.js renderer! */}
                    <MarkdownRenderer markdown={postContent} />
                </div>

            </div>
        </div>
    );
}