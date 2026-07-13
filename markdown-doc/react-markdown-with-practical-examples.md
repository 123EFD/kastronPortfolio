---
description: >-
  A safer-path by converting Markdown directly into React components—skipping
  that risky API (dangerouslySetInnerHTML) entirely.
---

# React Markdown with Practical Examples

#### Reference : [**https://github.com/remarkjs/react-markdown**](https://github.com/remarkjs/react-markdown)

* React-markdown converts Markdown directly to React components without using `dangerouslySetInnerHTML`, eliminating XSS vulnerabilities
* Custom component mapping <mark style="color:$info;">**enables seamless design system**</mark> integration while maintaining proper content structure
* Security features include automatic content sanitization, element whitelisting, and URL validation
* Performance optimization techniques like memoization and code splitting keep Markdown rendering efficient at scale

#### Introduction

1. React-markdown is a lightweight React comp. that renders Markdown text into HTML while maintaining React's component structure and security model
2. Using `remark` and `rehype` , it convert Markdown into React comp. without relying on dangerouslySetInnerHTML&#x20;

#### Installation and setup

`npm install react-markdown` &#x20;

**Import and use in React component**&#x20;

```jsx
import ReactMarkdown from 'react-markdown';
const MyComponent = () => {
    const markdown = '# Hello, world!';
    return <ReactMarkdown>{markdown}</ReactMarkdown>;;
};
```

Markdown content is passed as the children prop

### **Styling Markdown Output**

* React-Markdown gives you complete control over visual and behavioral rendering through the `components` prop.&#x20;
* Map every Markdown element (`h1`, `a`, `img`) to your own React components.&#x20;
* Since rendering happens through JSX, you can inject props, context, or design-system tokens without `dangerouslySetInnerHTML`.
* Each renderer is a React function , can wire them into styling CSS modules, Tailwind&#x20;
* keep components predictable&#x20;

```jsx
import ReactMarkdown from 'react-markdown';

function H1(props) { 
  return <h1 className="heading-xl" {...props} />; 
}

function P(props) { 
  return <p className="body-md" {...props} />; 
}

export default function Article({ markdown }) { 
  return (
    <ReactMarkdown components={{ h1: H1, p: P }}>
      {markdown}
    </ReactMarkdown>
  );
}
```

```jsx
import styled, { useTheme } from 'styled-components';

const Img = ({ node, ...props }) => {
  const { breakpoints } = useTheme();
  return (
    <figure>
      <img
        {...props}
        style={{ maxWidth: '100%', borderRadius: 8 }}
        loading="lazy"
      />
      {props.alt && <figcaption>{props.alt}</figcaption>}
      <style jsx>{INLINECODE_4}</style>
    </figure>
  );
};

// Behavior can be customized too. Add outbound-link analytics and security headers:

function Link({ href, children, ...rest }) {
  const external = /^https?:\/\//.test(href);
  const handleClick = () => external && window.analytics.track('outbound', { href });

  return (
    <a
      href={href}
      {...rest}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
    >
      {children}
      {external && '↗'}
    </a>
  );
}
```

### **Adding Syntax Highlighting to Code Blocks**

#### **Installing react-syntax-highlighter :** `react-syntax-highlighter`

{% code overflow="wrap" %}
```
npm install react-syntax-highlighter prismjs
# or
yarn add react-syntax-highlighter prismjs
```
{% endcode %}

{% code overflow="wrap" %}
```jsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
```
{% endcode %}

#### **Integrating with react-markdown**

{% code overflow="wrap" %}
```jsx
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function Markdown({ source }) {
  return (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={dracula}
                language={match[1]}
                showLineNumbers
                wrapLongLines
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
```
{% endcode %}

1. match variable pulls the language from fenced code blocks&#x20;
2. inline snippets stay untouched , preserving the readability in paragraph
3. `showLineNumbers` and `wrapLongLines` props enhance longer examples, while unsupported languages fall back to plain \<code>

#### **Choosing and Customizing Themes**

`react-syntax-highlighter` includes dozens of themes. Popular choices like `dracula`, `oneDark`, and `atomDark` provide familiar color schemes

{% code overflow="wrap" %}
```jsx
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Later in component
const isDark = useDarkMode(); // hypothetical hook
const theme = isDark ? oneDark : dracula;
```
{% endcode %}

#### **Performance Considerations**

Lazy-load the highlighter component with `React.lazy` so it only downloads when code blocks appear in your content.

For <mark style="color:$primary;">**static content like blog posts**</mark>, consider **pre-highlighting during your build pipeline and shipping plain HTML**. This removes runtime costs entirely while maintaining the visual polish your users expect.

#### **Math Rendering and Diagrams**

Technical blogs need inline formulas like `E = mc^2` or full equations. Add `remark-math` for parsing and `rehype-katex` for client-side rendering:

{% code overflow="wrap" %}
```jsx
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

<ReactMarkdown 
  remarkPlugins={[remarkMath]} 
  rehypePlugins={[rehypeKatex]}
>
  {markdown}
</ReactMarkdown>
```
{% endcode %}

{% hint style="info" %}
Complex diagrams follow the same pattern: pair `remark-mermaid` with a lightweight Mermaid runtime. Katex and Mermaid add significant kilobytes to your bundle, so load them lazily or gate behind feature flags when performance matters.
{% endhint %}

#### **When to Build Custom Plugins**

Existing packages solve most needs, but you might need to transform custom syntax—like `<Product price="29" />` shortcodes from your marketing team

The [remark documentation](https://github.com/remarkjs/remark) explains the visitor pattern with examples. Search the plugin registry first—someone else likely solved your problem already, saving bundle size and maintenance work.

#### **Handling Large Documents**

* Long posts or knowledge-base articles can overwhelm the DOM and slow down user devices
* A windowing library like `react-window` renders only the visible lines, keeping memory usage manageable
* method: static generation , pre-render pages at build times&#x20;

{% code overflow="wrap" %}
```jsx
import { FixedSizeList as List } from 'react-window';
import ReactMarkdown from 'react-markdown';

const lines = markdown.split('\n');

<List height={600} itemCount={lines.length} itemSize={24} width="100%">
  {({ index, style }) => (
    <div style={style}>
      <ReactMarkdown>{lines[index]}</ReactMarkdown>
    </div>
  )}
</List>
```
{% endcode %}

#### **Loading States and Error Handling**

* show spinner while fetching, catch network errors gracefully, and sanitize before rendering
* wrap your component in an error boundary to protect UI

{% code overflow="wrap" %}
```jsx
function Post({ id }) {
  const { data, error, isLoading } = useFetch(`/api/posts/${id}`);

  if (isLoading) return <Spinner />; 
  if (error) return <ErrorMessage />;

  return <Markdown source={DOMPurify.sanitize(data.body)} />; 
}
```
{% endcode %}

#### **Content Security Policy and Bundle Size**

1. A strict Content-Security-Policy header—`default-src 'self'; script-src 'none'`—adds browser-level protection against XSS, complementing the sanitization techniques recommended by security researchers.
2. only import specific lang. and `React.lazy` so syntax highlighters load only on pages that need them
3. Consider CDN delivery for heavy, rarely changing assets to shift bandwidth off your origin.
