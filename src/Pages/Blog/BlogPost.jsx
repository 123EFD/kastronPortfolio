import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MarkdownRenderer } from '../../components/Markdown/MarkdownRenderer';

export const BlogPost = () => {
    const {slug} = useParams();

    return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <Link to="/blog" className="text-primary hover:underline mb-8 inline-block">
        &larr; Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-4">Post Slug: {slug}</h1>
      <div className="prose dark:prose-invert max-w-none mt-8">
        <p>This is the placeholder for the parsed Markdown content of the <strong>{slug}</strong> post.</p>
        <MarkdownRenderer markdown={`# Sample Markdown Content for ${slug}\n\nThis is a sample blog post content written in Markdown. You can add more content here as needed.`} />
      </div>
    </div>
  );
}