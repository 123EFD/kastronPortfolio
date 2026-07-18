//convert raw string of text to produce renderable HTML
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw'; 
import rehypeStringify from 'rehype-stringify'
import { customDirectivesPlugin } from './customDirectivesPlugin';
import remarkSubSuper from 'remark-sub-super';

/*
converts raw Markdown string into styles HTLM for public portfolio blog 
parameter is markdown content string 
return rendered HTML content 
*/ 

export const convertMarkdownToHTML = async (markdownContent) => {
    const file = await unified()
        .use(remarkParse)               // 1. Break text string into markdown tokens
        .use(remarkGfm)                 // 2. Add support for tables, autolinks, strikethrough
        .use(remarkDirective)           // 3. Look for triple-colon syntax :::
        .use(customDirectivesPlugin)    // 4. Map :::info into custom class styling properties
        .use(remarkSubSuper)            
        // 5. Convert Markdown AST to HTML AST (Bypass strict string escaping)
        .use(remarkRehype, { allowDangerousHtml: true }) 
        
        // 6. Rescan the HTML tree to interpret raw <sup> and <sub> tags correctly
        .use(rehypeRaw) 
        
        .use(rehypeStringify)           // 7. Compile the nodes down to a final HTML string
        .process(markdownContent);

    return String(file);
}