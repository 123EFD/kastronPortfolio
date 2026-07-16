# Asset pipeline for image upload

#### Reference:

{% embed url="https://prosemirror.net/docs/guide/" %}

{% embed url="https://milkdown.dev/docs/api/plugin-upload" %}

\[User drops image] ──> \[Upload Plugin Intercepts] ──> \[FileReader converts to Base64]\
\
\[Editor renders image] <── \[Insert raw.githubusercontent URL] <── \[GitHub API PUT Upload]

* Interception: The `@milkdown/plugin-upload` plugin <mark style="color:$primary;">**registers event listeners**</mark> on the **editor DOM wrapper** to catch `drop` and `paste` browser events.
* Serializing: The system intercepts the <mark style="color:$primary;">**native file list payload**</mark>. It **prevents the default browser** behavior (which is usually to open the image file directly in the tab) and <mark style="color:$info;">**maps over the binary files.**</mark>
* Encoding & Transport: Each image is <mark style="color:$primary;">**converted to Base64 string data**</mark>. This is <mark style="color:$info;">**packaged into a payload**</mark> and sent to  `uploadFile` utility which **commits it to a folder** like `src/assets/blog-images/`.
* AST Hydration: GitHub <mark style="color:$primary;">**returns the raw JSON description**</mark> containing the new image's <mark style="color:$info;">public CDN link</mark>. The plugin takes this URL and <mark style="color:purple;">**tells ProseMirror to create a new image node**</mark> pointing to it, <mark style="color:$info;">rendering</mark> the photo instantly in the editor.

#### Architectural Concepts & Data Structures

`ProseMirror's` Node Schema : Tree Data Structure

* `ProseMirror` represents document as a **hierarchical tree of Nodes and Marks**
* Blocks (Branch Nodes): Heading, Paragraph, List Item.&#x20;
* Inlines (Leaf Nodes): Text, HardBreak, and Image. (imagine as the contents of the block)
* Marks (Node Attributes): Bold, Italic, Link (decorations applied to text). (imagine as how the content would be like )
* When you insert an image, you are inserting a new Image Leaf Node into the active tree coordinate

```json
{
  "type": "image",
  "attrs": {
    "src": "https://raw.githubusercontent.com/...",
    "alt": "My uploaded photo",
    "title": null
  }
}
```

#### Transactions & Commands (Immutable State Updates)

* To modify the ProseMirror such as inserting the image, the upload plugin creates a Transaction (tr)
* it similar as an atomic database commit by
  * **calculating** the current cursor selection position,&#x20;
  * **deletes** any temporary loading placeholder
  * **inserts** the new `image` node
  * **dispatches** the update
* The engine then calculates the **visual difference** and **updates the viewport**.
* `@milkdown/plugin-upload`  ： utilizes upload configuration callback spec that acts as an observer that <mark style="color:$primary;">**listens to specific browser input nodes**</mark>
  * handles the raw file array
  * provides a hook to map those files to schema mutations.
