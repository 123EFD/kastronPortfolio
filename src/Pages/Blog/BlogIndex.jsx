//map markdown files and list them
import React from 'react';
import { Link } from 'react-router-dom';

export const BlogIndex = () => {
    return (
    <div className="container mx-auto max-w-5xl py-24 px-4">
      <h1 className="text-4xl font-bold mb-8">My Blog</h1>
      
      {/* Temporary placeholder for a blog post link */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Example Blog Post</h2>
        <p className="text-muted-foreground mb-4">A brief description of the blog post goes here...</p>
        <Link to="/blog/example-post" className="text-primary hover:underline">
          Read more &rarr;
        </Link>
      </div>
    </div>
  );
}