//accept raw string as prop, manage unified.js to output final safe HTML structure into DOM
import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import { customDirectives } from './customDirectives';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import './markdownStyles.css'; 

export const MarkdownRenderer = ({ markdown }) => {
    const [processContent, setProcessContent] = useState('');

    useEffect(() => {
        const markdownToHtml = async () => {
            try {
                const result = await unified()
                    .use(remarkParse)
                    .use(remarkDirective)
                    .use(customDirectives)
                    .use(remarkMath)
                    .use(remarkRehype)
                    .use(rehypeKatex)
                    .use(rehypeCitation)
                    .use(rehypeStringify)
                    // rehypeCitation requires a valid bibliography file in your public folder to work fully
                    // .use(rehypeCitation, { bibliography: '/references.bib' })
                    .process(markdown);
                    
                setProcessContent(result.toString()); //trigger update
            } catch (error) {
                console.error('Error processing markdown:', error);
            }
        };

        markdownToHtml();

    }, [markdown]);

    return (
        <div
            className="prose dark:prose-invert max-w-none w-full"
            dangerouslySetInnerHTML={{ __html: processContent }}
        />
    );
}
