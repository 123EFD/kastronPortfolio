---
description: >-
  Unified:ecosystem of tools allowing the developer to parse a format into an
  abstract tree and back into another format (for example, markdown to html) and
  modify said tree
---

# Unified, Remark, and Rehype to Build a Perfect Markdown Processor

Why need 4 dif packages?

```jsx
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
```

* **Unified (Unify all package):** manipulating content, convert strings into structured data (syntax tree) for other plugins usage such as linting, spellcheck **transforming from one format to another (e.g. Markdown → HTML)**
* **Remark:** mark core engine (operating on markdown syntax tree)
* **Rehype** : all about HTML (Hype = HyperText). **Anything `rehype-*` is operating on an HTML syntax tree**
* [**mdast**](https://github.com/syntax-tree/mdast) - a specification for **representing Markdown** in a syntax tree ([see this example](https://astexplorer.net/#/gist/6533372612c0e913d9f4050d7b286cb6/b7b864b2806df152451f194544c6a53eb76022c4))
* [**hast**](https://github.com/syntax-tree/hast) - a specification for r**epresenting HTM**L (and embedded SVG or MathML) as an abstract syntax tree. You can use [rehype](https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse) to **parse html text as hast.**
* [**unist**](https://github.com/syntax-tree/unist) - is a specification for **syntax trees**. mdast and hast are unist-compliant syntax trees

### How they work?

* reading the markdown content (from the textarea in this case)
* using `remarkParse` to convert the markdown into a syntax tree (this state you can make your own plugin such as add specific css classes to certain elements )
* using `remarkRehype` to convert the markdown syntax tree to an html syntax tree
* using `rehypeStringify` to convert the html syntax tree to an html string

### **Setup**

```jsx
/import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkParseFrontmatter from "remark-parse-frontmatter"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"

const result = unified()
  // Take Markdown as input and turn it into MD syntax tree
  .use(remarkParse)
  // Add support for frontmatter in Markdown
  .use(remarkFrontmatter, ["yaml"])
  // Parse and validate Markdown frontmatter (YAML)
  .use(remarkParseFrontmatter)
  // Switch from MD syntax tree to HTML syntax tree (remark -> rehype)
  .use(remarkRehype, {
    // Necessary for support HTML embeds (see next plugin)
    allowDangerousHtml: true,
  })
  // Support HTML embedded inside markdown
  .use(rehypeRaw)
  // Improve code highlighting
  .use(rehypeHighlight)
  // Serialize syntax tree to HTML
  .use(rehypeStringify)
  // And finally, process the input
  .processSync(content)
```

```js
// These `unist-util-*` utilities are super useful when working with unist
// syntax trees
const is = require("unist-util-is");
const visit = require("unist-util-visit");

// We're going to need this to convert some mdast nodes to hast nodes later on
const mdastToHast = require("mdast-util-to-hast");

// Our plugin's constructor function. This would receive configuration options.
module.exports = function subtitlePlugin() {
  // Plugins need to return a transform function that takes a unified compatable
  // AST and manipulate or walk it.
  return async function transform(tree) {
    // Go through the Markdown document (in mdast form) and call my callback
    // whenever you see paragraph nodes.
    visit(tree, "paragraph", (paragraphNode) => {
      const { children } = paragraphNode;

      // Get the first child node under the paragraph and make sure it's a text
      // node. If it's not, skip processing this paragraph node.
      const textNode = children && children[0];
      if (!is(textNode, "text")) {
        return;
      }

      // Does this text node start with a sequence of hash ('#') signs followed
      // by a dash ('-')?
      const text =
        typeof textNode.value === "string" ? textNode.value.trimLeft() : "";
      const re = /^(#{1,6})-\s+/;
      const matches = text.match(re);
      if (typeof text === "string" && !matches) {
        return;
      }

      // If it did let's count the number of '#'s as that will be our subtitle
      // depth
      const depth = matches[1].length;

      // Once we have what we need, let's make a copy of this text node without
      // the leading subtitle syntax.
      // i.e. '##- hello world' becomes 'hello world'
      const newValue = text.replace(re, "");

      // We can now attach some metadata to an mdast node. If the node is being
      // serialized to html by a hast-compatible library, it will know to use
      // these overrides instead of the default behaviour of rendering a plain
      // <p> tag.
      paragraphNode.data = {
        // we could use a different html tag but "p" is semantically correct for
        // the subtitle
        hName: "p",
        // The <p> tag will have the following attributes added to it.
        // Note that we need to use "className" for the html "class" attribute.
        hProperties: {
          className: `subtitle subtitle--${depth}`,
          "data-remark-subtype": "subtitle",
          "data-subtitle": depth,
        },
        // When we are passing custom children, it is our responsibility to make
        // sure they are in hast format instead of mdast. We use the library,
        // mdast-util-to-hast, to do this conversion.
        hChildren: [
          // We pass in a modified text node without the leading subtitle
          // characters
          {
            ...textNode,
            value: newValue,
          },
          // Then we pass in the rest of the children under this paragraph node
          ...children.slice(1),
        ].map(mdastToHast), // Finally convert it all to hast
      };
    });
  };
};
```
