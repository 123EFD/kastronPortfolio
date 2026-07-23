import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import { customDirectives } from './customDirectives';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

// CSS Imports
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';
import './markdownStyles.css';

export const MarkdownRenderer = ({ markdown }) => {
    const safeMarkdown = markdown || '';

    // Safely parse ^2^ and ~2~ without touching math blocks
    let preProcessedMarkdown = safeMarkdown
        .replace(/\$\$([\s\S]*?)\$\$/g, (match, mathContent) => {
            let processedMath = mathContent;
            if (!processedMath.includes('\\\\') && processedMath.includes('\\')) {
                processedMath = processedMath.replace(/\\/g, '\\\\');
            } 
            return `$$\n${processedMath}\n$$`;
        });

    preProcessedMarkdown = preProcessedMarkdown
        .replace(/\^([a-zA-Z0-9-]+)\^/g, '<sup>$1</sup>')
        .replace(/~([a-zA-Z0-9-]+)~/g, '<sub>$1</sub>')

    return (
        <div className="prose dark:prose-invert max-w-none w-full">
            {/* 🚀 react-markdown natively handles the AST conversions and protects math from the HTML sanitizer! */}
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkDirective,
                    customDirectives, // Your custom colors and info boxes
                    remarkMath
                ]}
                rehypePlugins={[
                    rehypeRaw, // Allows HTML tags
                    [rehypeHighlight, { detect: true }], // Syntax Highlighting
                    [rehypeKatex, { strict: false }], // LaTeX Math
                ]}
            >
                {preProcessedMarkdown}
            </ReactMarkdown>
        </div>
    );
};