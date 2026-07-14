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

