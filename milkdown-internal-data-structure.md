# Milkdown Internal Data Structure

* Milkdown does not use standard React state (`useState`) to manage its data under the hood
* It use Dependency Injection Map called the Context (`Ctx`).

#### Core components:

* `Editor`  : assemble all the independent pieces of ProseMirror ( the underlying text engine) & mount them to the browser DOM
* `Ctx`  : internal `Map()`  (key-value store). Plugin X talk directly to each others&#x20;
  * they can only read and write to this central `Ctx` map.
* `rootCtx`: Stores the <mark style="color:$primary;">**physical HTML DOM**</mark> node (the `<div>`) where the <mark style="color:$info;">**editor will be drawn.**</mark>
* `defaultValueCtx`: Stores the <mark style="color:$primary;">**initial markdown string.**</mark> The editor <mark style="color:$info;">**reads this exactly**</mark><mark style="color:$info;">**&#x20;**</mark>_<mark style="color:$info;">**once**</mark>_<mark style="color:$info;">**&#x20;**</mark><mark style="color:$info;">**during boot-up**</mark> to populate the screen.
* `listenerCtx`: <mark style="color:$primary;">**Stores the event-handling configuration**</mark>. It allows you to tap into the engine and <mark style="color:$info;">**extract the live Markdown string every time a keystroke occurs.**</mark>
* `localStorage` (The Persistence Layer): A <mark style="color:$primary;">**native browser API**</mark> that stores **key-value string pairs**.
  * &#x20;save the raw markdown output so it <mark style="color:$primary;">**survives a page refresh.**</mark>
