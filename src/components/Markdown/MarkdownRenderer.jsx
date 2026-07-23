//accept raw string as prop, manage unified.js to output final safe HTML structure into DOM
import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import { customDirectives } from './customDirectives';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import rehypeHighLight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';
import './markdownStyles.css';

export const MarkdownRenderer = ({ markdown }) => {
    const [processContent, setProcessContent] = useState('');

    useEffect(() => {
        const markdownToHtml = async () => {
            try {
                const safeMarkdown = markdown || '';

                const preProcessedMarkdown = safeMarkdown
                    .replace(/\^([a-zA-Z0-9-]+)\^/g, '<sup>$1</sup>')
                    .replace(/~([a-zA-Z0-9-]+)~/g, '<sub>$1</sub>');

                const result = await unified()
                    .use(remarkParse)
                    .use(remarkDirective)
                    .use(customDirectives)
                    .use(remarkGfm)
                    .use(remarkMath)
                    .use(remarkRehype, { allowDangerousHtml: true })
                    .use(rehypeRaw)
                    .use(rehypeHighLight, {detect :true})
                    .use(rehypeKatex, {strict: false})
                    .use(rehypeCitation)
                    .use(rehypeStringify)
                    .process(preProcessedMarkdown);
                    // rehypeCitation requires a valid bibliography file in your public folder to work fully
                    // .use(rehypeCitation, { bibliography: '/references.bib' })
                    
                setProcessContent(result.toString()); //trigger update
            } catch (error) {
                console.error('Error processing markdown:', error);
            }
        };

        if (markdown && typeof markdown === 'string') {
            markdownToHtml();
        }

    }, [markdown]);

    return (
        <div
            className="prose dark:prose-invert max-w-none w-full"
            dangerouslySetInnerHTML={{ __html: processContent }}
        />
    );
}
