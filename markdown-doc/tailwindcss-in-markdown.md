---
description: Assigning Custom Components to HTML elements
---

# TailwindCSS in markdown

**Tailwind Typography**:&#x20;

Tailwind Typography is a plugin for Tailwind CSS that provides a set of typographic styles and utilities for Markdown content. It helps improve the readability and visual appeal of text by applying consistent and responsive typographic styles.

_import custom component and then export a `components` object that maps the standard HTML to your custom component_: **Style custom paragraph**

{% code overflow="wrap" %}
```jsx
import Paragraph from '../components/Paragraph.astro';
export const components = {p: Paragraph}
```
{% endcode %}

`Paragraph.astro` component: `<slot />` is where the “child” content (paragraph’s text) will go.

{% code overflow="wrap" %}
```jsx
<p class="pb-3 text-slate-400 text-xl">
    <slot />
</p>
```
{% endcode %}

#### Parse the Markdown files and extract metadata

Tool: nextjs-mdx-remote package ; date-fns package

* **nextjs-mdx-remote**: library that **enables rendering of MDX (Markdown and JSX) content** in Next.js applications. It allows you to **fetch and render MDX files** on both the server and client sides, making it suitable for <mark style="color:$primary;">building blogs and documentation websites</mark>.
* **gray-matter**: JavaScript library used for **parsing and extracting metadata from Markdown files**. It allows you to <mark style="color:pink;">**access front-matter data (metadata) in your Markdown files**</mark>, such as titles, dates, or custom fields. It simplifies working with Markdown files that contain additional structured data.
* **date-fns**: lightweight JavaScript library for working with dates. It provides various utility functions for **parsing, formatting, manipulating, and comparing dates**. In the context of a blog, date-fns can be used to format dates from metadata in a human-readable format, handle time zones, calculate time differences, and perform other date-related operations.<br>

#### The setup

1.  ```
    $ node --version
    ```

    ```
    v19.4.0
    ```
2. ```
   $ npx create-next-app@latest dev-blog --typescript --eslint
   ```
3.  Installing and configuration for tailwindcss : <br>

    ```
    $ cd dev-blog
    $ npm install -D tailwindcss postcss autoprefixer
    $ npx tailwindcss init -p
    ```
4.  Change the file **`styles/globals.css`** with the following content:&#x20;

    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
5.  Adding base-style:

    ```jsx
    @layer base {
        a {
            @apply text-blue-600 hover:text-blue-500 dark:text-sky-400;
        }
        h1 {
            @apply dark:text-gray-300 text-3xl;
        }
        h2 {
            @apply text-2xl;
        }
        h3 {
            @apply text-xl;
        }
    }
    ```
6.  Install plugin :&#x20;

    ```
    $ npm install -D @tailwindcss/typography
    ```
7.  &#x20;add the plugin to the Tailwind CSS configuration file, **`tailwind.config.js` :**

    ```jsx
    module.exports = {
      content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [require("@tailwindcss/typography")],
    };
    ```
8.  Install nextjs-mdx-remote and other npm packages :

    ```
    $ npm install gray-matter --save
    $ npm install date-fns --save
    $ npm install next-mdx-remote --save
    ```
9. Generating date and creating mdx file: create the file with a name that can be sorted by date on the home page
   1. get the date from the **`toISOString()`** output and the name for the file from the **`getTime()`** output:
   2. ```jsx
      $ node -e 'console.log(new Date().toISOString(), new Date().getTime())'
      2022-04-27T23:34:37.161Z 1651102477161
      ```
10. Create a directory called **`mdxfiles`** and place there all your markdowns : create the file using the name from **`getTime()`** and the date from **`toISOString()`**:

    ```jsx
    $ vim mdxfiles/1651102477161.mdx
    ---
    title: Blog with NextJs, Tailwind and Markdown
    summary: |
      Short description
    date: 2022-04-27T23:34:37.161Z
    ---

    Some content here....
    ```


11. Modify the [`index.js`](https://github.com/albac/dev-blogs/blob/main/pages/index.js#L35) file and reverse array order, to get the latest blog on top by using  **`slice(0).reverse.map`** to reverse the array

    ```jsx

    posts: allPosts
        .slice(0)
        .reverse()
        .map(({ data, slug }) => ({
            ...data,
            date: data.date.toISOString(),
            content: data.summary,
            slug,
        })),

    ```
12. Get Posts :  create the [`GetAllPost library`](https://github.com/albac/dev-blogs/blob/main/lib/data.js) that will get all post from our mdx files directory：

    ```jsx
    export function getAllPosts() {
      const allPosts = fs.readdirSync(contentDirectory);
      // console.log(allPosts);

      return allPosts.map((fileName) => {
        const slug = fileName.replace(".mdx", "");
        const fileContents = fs.readFileSync(
          path.join(contentDirectory, fileName),
          "utf8"
        );
        const { data, content } = matter(fileContents);
        // console.log(data, content);
        return {
          data,
          content,
          slug,
        };
      });
    }

    ```

    <br>
13. List Posts : edit our [`index`](https://github.com/albac/dev-blogs/blob/main/pages/index.js) page to list all posts, we use getAllPost library on the getStaticProps

    ```jsx
    export default function Home({ posts }) {
        return (
            <div className="h-screen">
                <Head>
                    <title>albac: home</title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <h1>Projects</h1>
                </main>
                <div className="space-y-8 mt-4">
                    {posts.map((item) => (
                        <BlogListItem key={item.slug} {...item} />
                    ))}
                </div>
            </div>
        );
    }

    export async function getStaticProps() {
        const allPosts = getAllPosts();

        return {
            props: {
                posts: allPosts
                    .slice(0)
                    .reverse()
                    .map(({ data, slug }) => ({
                        ...data,
                        date: data.date.toISOString(),
                        content: data.summary,
                        slug,
                    })),
            },
        };
    }

    ```


14. **Changes for next-mdx-remote :** use MDXRemote directly to hydrate the markdown content ; replaced with serialize

    ```jsx
    -  const mdxSource = await renderToString(content);
    +  const mdxSource = await serialize(content);
    ```

    ```jsx
    <MDXRemote {...content} />
    ```

    ```jsx
    -import renderToString from 'next-mdx-remote/render-to-string';
    -import hydrate from 'next-mdx-remote/hydrate';
    +import { serialize } from 'next-mdx-remote/serialize';
    +import { MDXRemote } from 'next-mdx-remote';
    ```
15. Using typography plugin and prose : use the <mark style="color:cyan;">**`prose`**</mark><mark style="color:cyan;">**&#x20;**</mark><mark style="color:cyan;">**class to add styles**</mark> and also <mark style="color:violet;">**use HTML tags in the markdown**</mark>

    ```jsx
    <article className="prose dark:prose-invert text-slate-600 dark:text-slate-300 font-light font-sans">
        <MDXRemote {...content} />
    </article>
    ```

{% hint style="info" %}
We're also using **`dark:prose-inverse`** to enable the use of our dark theme on the markdown.
{% endhint %}

{% code overflow="wrap" %}
```javascript
import Head from "next/head";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import { getAllPosts } from "../../lib/data";

export default function BlogPage({ title, date, content }) {
  return (
    <div className="max-h-fit">
      <Head>
        <title>albac: {title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container dark:bg-slate-900">
          <div className="border-b-2 border-gray-400 my-4">
            <h2 className="dark:text-white text-3xl font-bold">{title}</h2>
            <div className="text-sm text-gray-600 dark:text-gray-200 mt-4">
              {format(parseISO(date), "MMMM do, uuu")}
            </div>
          </div>
          <article className="prose dark:prose-invert prose-img:rounded text-slate-600 dark:text-slate-300 font-light font-sans">
            <MDXRemote {...content} />
          </article>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  // console.log(context);
  const { params } = context;
  const allPosts = getAllPosts();
  const { data, content } = allPosts.find((item) => item.slug === params.slug);
  // console.log(data, content);
  const mdxSource = await serialize(content);

  return {
    props: {
      ...data,
      date: data.date.toISOString(),
      content: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPosts().map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
```
{% endcode %}

Here's a complete list of available element modifiers:

| Modifier                     | Target                       |
| ---------------------------- | ---------------------------- |
| `prose-headings:{utility}`   | `h1`, `h2`, `h3`, `h4`, `th` |
| `prose-lead:{utility}`       | `[class~="lead"]`            |
| `prose-h1:{utility}`         | `h1`                         |
| `prose-h2:{utility}`         | `h2`                         |
| `prose-h3:{utility}`         | `h3`                         |
| `prose-h4:{utility}`         | `h4`                         |
| `prose-p:{utility}`          | `p`                          |
| `prose-a:{utility}`          | `a`                          |
| `prose-blockquote:{utility}` | `blockquote`                 |
| `prose-figure:{utility}`     | `figure`                     |
| `prose-figcaption:{utility}` | `figcaption`                 |
| `prose-strong:{utility}`     | `strong`                     |
| `prose-em:{utility}`         | `em`                         |
| `prose-kbd:{utility}`        | `kbd`                        |
| `prose-code:{utility}`       | `code`                       |
| `prose-pre:{utility}`        | `pre`                        |
| `prose-ol:{utility}`         | `ol`                         |
| `prose-ul:{utility}`         | `ul`                         |
| `prose-li:{utility}`         | `li`                         |
| `prose-dl:{utility}`         | `dl`                         |
| `prose-dt:{utility}`         | `dt`                         |
| `prose-dd:{utility}`         | `dd`                         |
| `prose-table:{utility}`      | `table`                      |
| `prose-thead:{utility}`      | `thead`                      |
| `prose-tr:{utility}`         | `tr`                         |
| `prose-th:{utility}`         | `th`                         |
| `prose-td:{utility}`         | `td`                         |
| `prose-img:{utility}`        | `img`                        |
| `prose-picture:{utility}`    | `picture`                    |
| `prose-video:{utility}`      | `video`                      |
| `prose-hr:{utility}`         | `hr`                         |
