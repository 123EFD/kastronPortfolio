# Frontmatter parsing using gray-matter

* the editor works with raw content, the metadata (Title, Date, Author, Tags) needs to be separated from the body when reading a file, and re-attached when saving it to GitHub.
* \[Fetch from GitHub] ──> \[gray-matter parses] ──> Metadata -> React Form State\
  &#x20;                                                                             └──> Markdown Body -> Milkdown Editor

&#x20;     \[Publish to GitHub] <── \[gray-matter joins] <── Metadata + Edited Markdown Body

* Before passing the text string to the `<MilkdownEditor />`, you run it through `gray-matter` to <mark style="color:$primary;">**isolate**</mark> the text
* When clicking Publish, app <mark style="color:$primary;">**aggregates the input fields**</mark> from your dashboard form, converts them back into a <mark style="color:$primary;">**YAML frontmatter string**</mark>
* Then , <mark style="color:$primary;">**combines**</mark> it with the **latest editor draft**, and <mark style="color:$primary;">**pushes the final single text chunk to GitHub**</mark> via your `uploadFile` function.

***

### Custom Milkdown Node View

* Milkdown translates Markdown into an Abstract Syntax Tree (AST) powered by ProseMirror.
* standard markdown blocks match default HTML elements (e.g., a header maps to `<h1>`, a blockquote maps to `<blockquote>`).
* Custom Node View is a <mark style="color:$primary;">**specialized user-interface lifecycle**</mark> handler that allows you to completely <mark style="color:$info;">**override**</mark> how a specific node is drawn and <mark style="color:$info;">**managed inside the live editor.**</mark>
* Node View gives you a programmatic **hook** to <mark style="color:$primary;">**inject complex DOM hierarchies**</mark>, specific styles, interactive toggle controls, or unique icons directly <mark style="color:$primary;">**into the editable text space.**</mark>
* editor **updates** this DOM tree **continuously** as the user modifies the text inside it.

***

### Real-Time Parsing & Rendering Pipeline for Directives

**Stage 1: The Markdown AST Parsing (MDAST):**

* By integrating `remark-directive`, the underlying engine **intercepts** the triple-colon format (`:::info`)and transforms it into a <mark style="color:$primary;">**specific abstract node layout**</mark> called a `containerDirective`
* It <mark style="color:$primary;">**parses the directive name (**</mark><mark style="color:$primary;">**`info`**</mark><mark style="color:$primary;">**) as an attribute**</mark> and <mark style="color:$primary;">**stores any nested elements**</mark>**&#x20;inside a children array.**

### The Schema Translation (ProseMirror Node)

The schema validates what parameters the block is allowed to accept. Below is how the node compiles&#x20;

* Milkdow**n&#x20;**<mark style="color:$primary;">**reads the MDAST output**</mark> and <mark style="color:$primary;">**maps it to a custom ProseMirror Schema**</mark> definition
* `parseMarkdown`: Instructs the editor how to convert the `containerDirective` node into an **internal rich-text model.**
* `toMarkdown`: Instructs the editor how to **stitch the data back** into the `:::info` string when saving the document draft.

### Custom Node View Lifecycle (Real-Time Rendering)

* The internal document state validates the node, it calls <mark style="color:$primary;">**registered Node View wrapper**</mark>. The lifecycle behaves as follows:
* Instantiation: The editor **instantiates a custom DOM element wrapper** (`document.createElement('div')`).
* Attribute Syncing: It **reads the directive type attribute** and **injects&#x20;**<mark style="color:$primary;">**target styling utilities into the wrapper class list.**</mark>
* Content Window Mapping (`contentDOM`): The Node View **defines a placeholder child container** called `contentDOM`.&#x20;
  * The editor <mark style="color:$primary;">**handles all typing events inside this specific placeholder**</mark>, **wrapping text** inside native paragraphs automatically while isolating it inside your custom container frame.

