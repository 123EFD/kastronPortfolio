//mount the editor load initial text, and listen for changes to save drafts
import React, { useEffect , useState } from 'react';
import { Editor, rootCtx, defaultValueCtx, remarkPluginsCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { uploadPlugin } from './uploadPlugin';
import { upload, uploadConfig } from '@milkdown/plugin-upload';
import { infoBoxPlugin } from './infoBoxPlugin';
import directive from 'remark-directive';
import 'prosemirror-view/style/prosemirror.css';
import '@milkdown/theme-nord/style.css';
import { $mark, $inputRule } from '@milkdown/utils';
import { InputRule } from '@milkdown/prose/inputrules';
import remarkSubSuper from 'remark-sub-super';
import '../Markdown/markdownStyles.css';
import {math} from '@milkdown/plugin-math';
import 'katex/dist/katex.min.css';

//color span plugin for syntax highlighting
const colorSpanPlugin = $mark('colorSpan', () => ({
    attrs: {
        color: { default : 'inherit' },
    },

    parseDOM : [
        {
            tag: 'span.custom-colored-span',
            getAttrs: (dom) => ({ color: dom.style.color }),
        },
    ],

    toDOM: (mark) => ['span', { class: 'custom-colored-span', style: `color: ${mark.attrs.color}` }, 0],

    //reading from GitHub
    parseMarkdown: {
        match: (node) => node.type === 'textDirective' && node.name === 'span',
        runner: (state, node, markType) => {
            // Grab the color from the {color=red} curly braces
            const colorAttr = node.attributes?.color || 'inherit';
            
            state.openMark(markType, { color: colorAttr });
            state.next(node.children);
            state.closeMark(markType);
        },
    },

    //saving back to GitHub
    toMarkdown: {
        match: (mark) => mark.type.name === 'colorSpan',
        runner: (state, mark) => {
            state.withMark(mark, 'textDirective', undefined, {
                name: 'span',
                attributes: { color: mark.attrs.color },
            });
        },
    },
}));

const colorSpanInputRule = $inputRule((ctx) =>
    // This regex listens for: :span[Text]{color=red} followed by a SPACE
    new InputRule(/:span\[([^\]]+)\]\{color=([^}]+)\}\s$/, (state, match, start, end) => {
        // match[1] is the text (e.g., "this text is bright red")
        // match[2] is the color (e.g., "red" or "#10b981")
        const mark = colorSpanPlugin.type(ctx).create({ color: match[2] });
        const { tr } = state;
        
        // 1. Erase the raw syntax and replace it with the newly colored text
        tr.replaceWith(start, end, state.schema.text(match[1], [mark]));
        
        // 2. Add the trailing space back in so the user can keep typing
        tr.insertText(' ');
        
        // 3. Prevent the color mark from continuing to the next words
        tr.removeStoredMark(mark);
        
        return tr;
    })
);

//define the htlm superscript, subscript
const superscriptPlugin = $mark('superscript', () => ({
    parseDOM: [{ tag: 'sup' }],
    toDOM: () => ['sup', 0],
    //read sup[th] from github or clipboard paste
    parseMarkdown: {
        match: (node) => node.type === 'sup',
        runner: (state, node, markType) => {
            state.openMark(markType);
            state.next(node.children);
            state.closeMark(markType);
        },
    },
    toMarkdown: {
        match: (mark) => mark.type.name === 'superscript', 
        runner: (state, mark) => {
            state.withMark(mark, 'sup');
        },
    },
}));

const superscriptInputRule = $inputRule((ctx) =>
    new InputRule(/\^([^^]+)\^$/, (state, match, start, end) => {
        const mark = superscriptPlugin.type(ctx).create();
        const { tr } = state;
        
        // 1. Erase "^text^" and replace it with just "text"
        // 2. Apply the superscript mark to that new text
        tr.replaceWith(start, end, state.schema.text(match[1], [mark]));
        
        // 3. Prevent the mark from continuing as the user keeps typing
        tr.removeStoredMark(mark);
        
        return tr;
    })
);

const subscriptPlugin = $mark('subscript', () => ({
    parseDOM: [{ tag: 'sub' }],
    toDOM: () => ['sub', 0],

    parseMarkdown: {
        match: (node) => node.type === 'sub',
        runner: (state, node, markType) => {
            state.openMark(markType);
            state.next(node.children);
            state.closeMark(markType);
        },
    },

    toMarkdown: {
        match: (mark) => mark.type.name === 'subscript',
        runner: (state, mark) => {
            state.withMark(mark, 'sub');
        },
    },
}));

const subscriptInputRule = $inputRule((ctx) =>
    new InputRule(/~([^~]+)~$/, (state, match, start, end) => {
        const mark = subscriptPlugin.type(ctx).create();
        const { tr } = state;
        
        tr.replaceWith(start, end, state.schema.text(match[1], [mark]));
        tr.removeStoredMark(mark);
        
        return tr;
    })
);

export const MilkdownEditor = ({initialText, file, githubToken }) => {
    const [resolvedContent, setResolvedContent] = useState(null); //hold the latest test that need to load
    
    //check localStorage on component mount, if draft exists, prompt user to confirm for replacing initialContent
    useEffect(() => {
        const savedDraft = localStorage.getItem(`draft-${file.sha}`);

        if (savedDraft) {
            // Prompt user to confirm replacing initial content
            const userConfirmed = window.confirm("A draft exists for this file. Do you want to load the draft instead of the initial content?");
            if (userConfirmed) {
                setResolvedContent(savedDraft);
            } else {
                setResolvedContent(initialText);
            }
        } else {
            setResolvedContent(initialText);
        }
    }, [file.sha, initialText]);

    //useEditor use to instantiate and manage the state of rich-text editor for WYSIWYG 
    useEditor((root) => {
        if (resolvedContent === null) return;

        return Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);

                ctx.set(defaultValueCtx, resolvedContent);

                ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
                    // Save to localStorage using the SHA key
                    localStorage.setItem(`draft-${file.sha}`, markdown);
                });
                
                ctx.update(uploadConfig.key, (prevConfig) => ({
                    ...prevConfig,
                    uploader : uploadPlugin(githubToken),
                }));

                ctx.update(remarkPluginsCtx, (prev) => [...prev, directive, remarkSubSuper]);
            })
            .use(commonmark)
            .use(gfm)
            .use(nord)
            .use(listener)
            .use(upload)
            .use(math)
            .use(infoBoxPlugin)
            .use(colorSpanPlugin)
            .use(superscriptPlugin)
            .use(subscriptPlugin)
            .use(colorSpanInputRule)
            .use(superscriptInputRule)
            .use(subscriptInputRule);
    }, [resolvedContent, file.sha, githubToken]);

    if (resolvedContent === null) {
        return <div className="text-muted-foreground p-4">Resolving draft status...</div>;
    }

    return(
        <div className="milkdown-container prose max-w-none w-full bg-card border border-border p-6 rounded-md">
            <Milkdown />
        </div>
    );
};