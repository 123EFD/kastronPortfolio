//map markdown files and list them
import React from 'react';
import { Link } from 'react-router-dom';
import { MarkdownRenderer } from '../../components/Markdown/MarkdownRenderer';

//test
const testMarkdown = `
# Markdown Renderer Test Sandbox

Below are the custom extensions processed through the unified engine pipelines.

:::info
**Information Box**
This container should render with a light blue background and a solid blue left-hand border.
:::

Testing an inline colored text directive wrapper to ensure styles map: :span[This text should render in bright red]{color=red}.

:::warning
**Warning Box Alert**
This container should render with an amber-yellow tint theme layer to signal high priority notes.
:::

# Advanced Features Test

## 1. Mathematical Elements (KaTeX)
You can write inline equations by wrapping them in single dollar signs. For example, the Pythagorean theorem is $a^2 + b^2 = c^2$.

You can also write complex block-level equations using double dollar signs:

$$
f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi
$$

## 2. Citations & Bibliography
If your \`rehype-citation\` is configured with a valid \`.bib\` file, you can cite references like this: [@smith2023]. 

*When fully configured, the plugin will automatically generate a "References" section at the very bottom of this document based on your citations!*
`;

export const BlogIndex = () => {
    return (
    <div className="container mx-auto max-w-5xl py-24 px-4">
      <div className="border border-dashed border-border p-6 rounded-xl bg-background">
        <span className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded mb-4 inline-block">
          Engine Sandbox Preview
        </span>

        {/* Render the Component */}
        <MarkdownRenderer markdown={testMarkdown} />
      </div>

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