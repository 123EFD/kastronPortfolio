---
description: Listener plugin for milkdown.
---

# @milkdown/plugin-listener

```typescript
import { Editor } from '@milkdown/kit/core'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { nord } from '@milkdown/theme-nord'

Editor.make()
  .config((ctx) => {
    const listener = ctx.get(listenerCtx)

    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        YourMarkdownUpdater(markdown)
      }
    })
  })
  .use(listener)
  // use other plugins
  .create()
```

#### Plugin

* key : `PluginKey`&#x20;
  * plugin key of the listener prosemirror plugin.
* listener : **`MilkdownPlugin`**
  * **listener plugin**

#### Listener

* listenerCtx: SliceType
  * ctx key of the listener manager&#x20;
  * `ctx.get(listenerCtx)` to get the listener manager.

#### **class ListenerManager (provide methods to subscribe to events)**

{% content-ref url="milkdown-plugin-listener.md" %}
[milkdown-plugin-listener.md](milkdown-plugin-listener.md)
{% endcontent-ref %}

*
  * **`listeners`**`: Subscribers`\
    <mark style="color:$primary;">**A getter to get all subscribers**</mark>. You should not use this method directly.
  * **`beforeMount`**`(fn: fn(ctx: Ctx)) → ListenerManager`\
    Subscribe to the <mark style="color:$primary;">**beforeMount event**</mark>. This event will be **triggered before the editor is mounted.**
  * **`mounted`**`(fn: fn(ctx: Ctx)) → ListenerManager`\
    Subscribe to the mounted event. This event will be **triggered after the editor is mounted.**
  * **`updated`**`(fn: fn(ctx: Ctx, doc: Node, prevDoc: Node | null)) → ListenerManager`\
    Subscribe to the <mark style="color:$primary;">**updated event**</mark>. This event will be triggered after the editor state is updated and <mark style="color:$primary;">**the document is changed**</mark>. The second parameter is the <mark style="color:$primary;">**current document**</mark> and the <mark style="color:$primary;">**third parameter is the previous document.**</mark>
  * **`markdownUpdated`**`(fn: fn(ctx: Ctx, markdown: string, prevMarkdown: string)) → ListenerManager`\
    Subscribe to the `markdownUpdated` event. This event will be <mark style="color:$primary;">**triggered after the editor state is updated**</mark> and **the document is changed**. The second parameter is the <mark style="color:$primary;">**current markdown**</mark> and the third parameter is the <mark style="color:$primary;">**previous markdown.**</mark>
  * **`blur`**`(fn: fn(ctx: Ctx)) → ListenerManager`\
    Subscribe to the <mark style="color:$info;">**blur event.**</mark> This event will be <mark style="color:$primary;">**triggered when the editor is blurred**</mark>.
  * **`focus`**`(fn: fn(ctx: Ctx)) → ListenerManager`\
    Subscribe to the focus event. This event will be triggered when the editor is <mark style="color:$info;">**focused**</mark>.
  * **`destroy`**`(fn: fn(ctx: Ctx)) → ListenerManager`\
    Subscribe to the <mark style="color:$primary;">**destroy event**</mark>. This event will be triggered <mark style="color:$info;">**before the editor is destroyed**</mark>.
  * **`selectionUpdated`**`(fn: fn(ctx: Ctx, selection: Selection, prevSelection: Selection | null)) → ListenerManager`\
    Subscribe to the `selectionUpdated` event. This event will be <mark style="color:$primary;">**triggered when the editor selection is updated.**</mark>

