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

#### 📋 Implementation To-Do List

#### Phase 1: Foundation & UI Integration

* \[x] **Navbar Update:** Add a "Blog" link to the upper right side of your existing navbar.
* \[x] **Theme Toggle:** Install `next-themes` and add a Dark/Light toggle button to the navbar. Configure Tailwind's `darkMode: 'class'` in your config.
* \[x] **Route Setup:** Create the base `/blog` page (listing posts) and `/blog/[slug]` page (individual post view).

#### Phase 2: The Markdown Engine

* \[ ] **Configure Unified.js:** Set up a utility function that takes a Markdown string and processes it through your `remark` and `rehype` plugins.
* \[ ] **Custom Directives:** Use `remark-directive` to create custom parsing rules for your info boxes (e.g., `:::info...:::`) and colored spans (e.g., `:span[text]{color=red}`).
* \[ ] **Styling Markdown:** Write global CSS or Tailwind typography styles (`@tailwindcss/typography`) to format the parsed HTML output, ensuring math equations and citations look clean.

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

#### Next Steps Recommendation

Before writing the code for your website, I highly recommend opening a blank Node.js script or a CodeSandbox. Install `unified`, `remark-parse`, `remark-directive`, `remark-rehype`, and `rehype-stringify`. Feed it a simple string like `:::info\\nHello\\n:::` and use `console.log()` to look at the AST it generates. Seeing the tree structure with your own eyes will make the actual implementation 10x easier.

#### Phase 3: Admin & Authentication

* \[ ] **NextAuth Setup:** Create an API route for `[...nextauth]` and configure the `GitHubProvider`.
* \[ ] **Admin Guard:** Create a middleware or layout wrapper for an `/admin` route that checks if the logged-in GitHub user matches your specific GitHub ID (to prevent anyone else from accessing your editor).
* \[ ] **Admin Dashboard:** Build a simple UI to list existing posts (fetched via GitHub API) with "Edit" and "Create New" buttons.

#### Phase 4: The Milkdown Editor & Drafts

* \[ ] **Initialize Milkdown:** Set up the React component for the Milkdown editor with the GFM (GitHub Flavored Markdown) preset.
* \[ ] **Draft Management:** Use `@milkdown/plugin-listener`. On every document change, save the raw Markdown string to `localStorage`. On editor load, check `localStorage` and prompt the user: "Restore unsaved draft?"
* \[ ] **GitHub Image Uploader:** Write a custom Milkdown image upload plugin. When an image is dropped/pasted:
  1. Convert it to Base64.
  2. Use `Octokit` to push it to a `public/blog-images` folder in your GitHub repo.
  3. Return the `raw.githubusercontent` URL and insert it into the editor.

#### Phase 5: Saving & Publishing

* \[ ] **Frontmatter Parser:** Use `gray-matter` to handle post metadata (Title, Date, Author, Series, Tags).
* \[ ] **GitHub Commit API:** Create an API route that accepts the final Markdown string and frontmatter, and uses `Octokit` to commit/push the `.md` file to your repository.

#### Phase 6: Blog Features & Metadata

* \[ ] **Author & Series Support:** Create a JSON configuration file (e.g., `authors.json`, `series.json`) to map author IDs to their bios/avatars, and group posts by a "series" tag in their frontmatter.
* \[ ] **Waline Comments:** Deploy the Waline backend to Vercel and connect it to LeanCloud. Add the `@waline/client` React component to the bottom of your `/blog/[slug]` page.
* \[ ] **Full-Text Search:** Write a script that runs at build-time (or fetches dynamically) to extract all post titles, tags, and content into a JSON index. Feed this index into `Fuse.js` and build a search modal.
* \[ ] **Sitemap Generation:** Use Next.js 13/14 native `sitemap.ts` to dynamically map over your GitHub repository's blog posts and generate XML nodes for SEO.
