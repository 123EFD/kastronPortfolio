# Tree-walking with remark directive implementation

`remark-directive` itself only <mark style="color:$primary;">**parses**</mark> <mark style="color:$primary;"></mark><mark style="color:$primary;">the directive syntax</mark> (e.g., `:name`, `::name`, or `:::name`) into <mark style="color:$primary;">**specific node**</mark> types; it <mark style="color:$info;">**does not transform them into HTML on its own**</mark>. To use them, you must write a custom plugin to "walk" the tree to find these nodes and define their behavior a custom plugin

#### Core Mechanism: `unist-util-visit`

It allows you to:&#x20;

1. **Traverse the Tree**: Recursively visit every node in the MDAST.
2. **Filter by Type**: Specifically target the three node types created by `remark-directive`: `containerDirective` (`:::`), `leafDirective` (`::`), and `textDirective` (`:`).
3. **Transform Nodes**: Modify the node's properties (like `data.hName` for HTML tag names) so they can be rendered correctly by tools like `remark-rehype` or [react-markdown](https://github.com/remarkjs/react-markdown/issues/585).&#x20;

To apply tree walking, your remark plugin follows this structure:

* **Initialize the Plugin**: Create a function that returns a transformer.
* **Call the Visitor**: Use `visit(tree, [types], visitorFunction)` to find directive nodes.
* **Modify Node Data**: Within the visitor function, map directive attributes to HTML properties

```jsx
import {visit} from 'unist-util-visit'

function myDirectivePlugin() {
  return (tree) => {
    // Walk the tree to find all types of directives
    visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node) => {
      const data = node.data || (node.data = {})
      
      // Transform the mdast node for HTML rendering (hast)
      data.hName = node.name            // Set the HTML tag (e.g., 'div', 'span')
      data.hProperties = node.attributes // Pass Markdown attributes to HTML
    })
  }
}
```

Key Node Types to Walk

| **containerDirective** | `:::name{attr}\ncontent\n:::` | Large blocks like Admonitions or Cards.            |
| ---------------------- | ----------------------------- | -------------------------------------------------- |
| **leafDirective**      | `::name{attr}`                | Standalone elements like Video embeds or Dividers. |
| **textDirective**      | `:name[text]{attr}`           | Inline styling like spans or specialized text.     |

#### How to integrate remark-directive into react-markdown

```jsx
import ReactMarkdown from "react-markdown";
import directive from "remark-directive";
import visit from "unist-util-visit";

import "./styles.css";

function reactMarkdownRemarkDirective() {
  return (tree) => {
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      (node) => {
        node.data = {
          hName: node.name,
          hProperties: node.attributes,
          ...node.data
        };
        return node;
      }
    );
  };
}

function MyDirective({node, ...props}) {
  return (
    <span className="doSomethingCustom" {...props} />
  );
}

export default function App() {
  return (
    <div className="App">
      <ReactMarkdown
        remarkPlugins={[directive, reactMarkdownRemarkDirective]}
        components={{ MyDirective }}
        children=":MyDirective[Content]{#me}"
      />
    </div>
  );
}
```

