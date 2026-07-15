---
description: bridge between Milkdown’s vanilla JavaScript engine and React application.
---

# useEditor

* not a React component; it is an independent editor instance built on ProseMirror
* Function : initialize that instance, configure it, and bind it to the React component lifecycle so it doesn't accidentally recreate the editor on every single keystroke.



<pre class="language-javascript"><code class="lang-javascript">// The useEditor hook takes a callback function and a dependency array
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { Milkdown, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';

export const MyEditor = ({ initialMarkdown }) => {
<strong>    const { get, loading } = useEditor((root) => {
</strong>        return Editor.make()
            .config((ctx) => {
                // 1. Tell Milkdown which HTML element to attach to
                ctx.set(rootCtx, root);
                
                // 2. Set the initial text content
                ctx.set(defaultValueCtx, initialMarkdown);
                
                // 3. Inject listeners or custom logic here...
            })
            // 4. Inject the plugins that give the editor its features
            .use(commonmark);
            
    }, [initialMarkdown]); // &#x3C;- The Dependency Array
    
    if (loading) return &#x3C;div>Loading Editor...&#x3C;/div>;
    
    // 5. The Milkdown component actually renders the DOM node
    return &#x3C;Milkdown />;
};
</code></pre>

* The Callback Function (`(root) => Editor.make()`) :
  * use to build editor, root arg. = empty `<div>` created by `@milkdown/react` wrapper
  * the Editor instance is fully configured attached to the root
* Configuration Context (ctx)
  * global state map&#x20;
  * `ctx.set(rootCtx, root)`: You are physically telling the engine, _"Mount yourself to this React-provided div."_
  * `ctx.set(defaultValueCtx, text)`: You are injecting the starting markdown string before the engine turns on.
* The Dependency Array `[initialMarkdown]`
  * `useEffect` or `useMemo`  same concept&#x20;
  * If you pass an empty array `[]`, the editor builds exactly once.
  * If you pass `[initialMarkdown]`, the hook will completely destroy the editor and rebuild a brand new one from scratch if `initialMarkdown` changes.
* **The `get` and `loading` returns**
  * `useEditor` returns an object
    * `loading`: A boolean that is `true` while the editor is booting up and parsing your markdown.
    * `get()`: A function you can call elsewhere in your React component to <mark style="color:$primary;">**retrieve the live editor instance**</mark> (e.g., if you want to <mark style="color:$info;">**write a custom button outside the editor**</mark> that clicks and inserts text)

{% hint style="info" %}
`useEditor` manages heavy, complex state, it will instantly crash if it is not wrapped in a Provider.
{% endhint %}

Wherever you render `<MyEditor />`, it must be inside a `<MilkdownProvider>`.

```javascript
// In your Dashboard or Parent component
import { MilkdownProvider } from '@milkdown/react';

const EditorWrapper = () => {
    return (
        <MilkdownProvider>
            <MyEditor initialMarkdown="# Hello World" />
        </MilkdownProvider>
    )
}
```
