# To-do list

#### 📋 Implementation To-Do List

#### Phase 1: Foundation & UI Integration

* \[x] **Navbar Update:** Add a "Blog" link to the upper right side of your existing navbar.
* \[x] **Theme Toggle:** Install `next-themes` and add a Dark/Light toggle button to the navbar. Configure Tailwind's `darkMode: 'class'` in your config.
* \[x] **Route Setup:** Create the base `/blog` page (listing posts) and `/blog/[slug]` page (individual post view).

#### Phase 2: The Markdown Engine

* \[ ] **Configure Unified.js:** Set up a utility function that takes a Markdown string and processes it through your `remark` and `rehype` plugins.
* \[ ] **Custom Directives:** Use `remark-directive` to create custom parsing rules for your info boxes (e.g., `:::info...:::`) and colored spans (e.g., `:span[text]{color=red}`).
* \[ ] **Styling Markdown:** Write global CSS or Tailwind typography styles (`@tailwindcss/typography`) to format the parsed HTML output, ensuring math equations and citations look clean.

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
