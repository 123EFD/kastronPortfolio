# Overview

## Portfolio- blog website.

#### 🛠️ Recommended Tech Stack

Assuming your current portfolio is built on a React-based framework like **Next.js** (which is highly recommended for this due to its SEO, SSR, and API route capabilities), here is your stack:

* **Core Framework:** Next.js (App Router)
* **Styling & Theming:** Tailwind CSS + `next-themes` (for effortless Dark/Light toggle)
* **Markdown Pipeline:**
  * `unified`, `remark-parse`, `rehype-stringify` (Core pipeline)
  * `remark-math` & `rehype-katex` (Math rendering)
  * `remark-directive` (For custom info boxes and colored spans)
  * `rehype-citation` (For citations/bibliography)
* **Editor:** `@milkdown/core`, `@milkdown/react`, `@milkdown/preset-gfm`, `@milkdown/plugin-listener` (for auto-saving drafts)
* **Authentication & Admin:** `NextAuth.js` (Auth.js) using the `GitHubProvider`
* **Image & Post Storage:** `octokit` (GitHub REST API client) to push Markdown files and base64 images directly to a private/public GitHub repository.
* **Comment System:** `@waline/client` (Frontend) + LeanCloud/Vercel (Backend database for Waline)
* **Search Engine:** `Fuse.js` or `FlexSearch` (for blazing-fast, client-side full-text search)
* **SEO & Routing:** Next.js native `sitemap.ts` and dynamic routing (`[slug].jsx/tsx`)

***

#### Prerequisites

#### 1. The Abstract Syntax Tree (AST)

This is the most important concept. Modern Markdown parsers do not use regular expressions (Regex) to convert text to HTML. Instead, they convert your text into a data structure called an Abstract Syntax Tree.

* **What it is:** The AST breaks your document down into "nodes" (e.g., a paragraph node, a heading node, an image node) arranged in a tree hierarchy.
* **Why you need it:** To create custom info boxes or colored spans, you aren't searching for strings of text. You are telling the engine to find a specific "node" in the tree and change its properties before it gets turned into HTML.

#### 2. The Unified.js Ecosystem (Remark vs. Rehype)

Unified.js is the core engine, but it uses different vocabularies depending on what it's looking at. You need to understand the boundary between them.

* **Remark (mdast):** This ecosystem deals strictly with **Markdown**. It parses markdown strings into a Markdown AST (`mdast`).
* **Rehype (hast):** This ecosystem deals strictly with **HTML**. It transforms an HTML AST (`hast`) into an actual HTML string.
* **The Bridge (`remark-rehype`):** You must understand that the pipeline goes: Text $\rightarrow$ Remark (mdast) $\rightarrow$ `remark-rehype` (Bridge) $\rightarrow$ Rehype (hast) $\rightarrow$ HTML. Your custom markdown directives must be processed _before_ or _during_ the bridge phase.

#### 3. AST Manipulation (`unist-util-visit`)

To make `remark-directive` work, you have to write a custom plugin. `remark-directive` only recognizes the `:::` syntax; it does not know what HTML to turn it into. You have to write the logic for that.

* **Tree Walking:** You need to understand how to "walk" or "traverse" a tree.
* **`unist-util-visit`:** This is a utility library you will use heavily. It allows you to say: "Visit every node of type 'containerDirective' in the tree, and if its name is 'info', change its HTML tag to a `div` and add a `class="bg-blue-100"`."

#### 4. Markdown Directive Syntax Standard

You need to know the official Markdown directive syntax (which `remark-directive` follows) so you know how to write your posts.

* **Text Directives (`:`):** Used for inline elements. Example: `This is :span[red text]{color="red"}`.
* **Leaf Directives (`::`):** Used for single block-level elements that don't contain other blocks. Example: `::youtube[Video Title]{v="12345"}`.
* **Container Directives (`:::`):** Used to wrap multiple blocks of content (like paragraphs or lists). Example: `:::info\\n Watch out!\\n:::`

#### 5. Tailwind Typography (`@tailwindcss/typography`)

When you parse Markdown, it outputs raw HTML tags (`<h1>`, `<p>`, `<ul>`) without any Tailwind classes on them.

* **The `prose` class:** You need to understand how the `@tailwindcss/typography` plugin uses the `prose` class to target nested, unclassed HTML elements and style them automatically.
* **CSS Specificity:** You need to know how to override the default `prose` styles. For example, if your custom info box uses text colors, you might need to use the `not-prose` class or adjust your Tailwind config so the default typography styles don't overwrite your custom directive styles.
