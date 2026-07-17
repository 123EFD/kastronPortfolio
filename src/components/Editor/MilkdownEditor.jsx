//mount the editor load initial text, and listen for changes to save drafts
import React, { useEffect , useState } from 'react';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { uploadPlugin } from './uploadPlugin';
import { upload, uploadConfig } from '@milkdown/plugin-upload';

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
                
                ctx.set(uploadConfig.key, {
                    uploader : uploadPlugin(githubToken),
                })
            })
            .use(commonmark)
            .use(gfm)
            .use(nord)
            .use(listener)
            .use(upload);
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