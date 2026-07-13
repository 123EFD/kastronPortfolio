# Remark Directive and Styling markdown

Remark directive : enables remark is used to extend standard Markdown by enabling custom components, embeds, and HTML elements without writing complex MDX or JavaScript

Example: info, warning, tip ; **Custom Layouts:** Wrapping text in specific structural elements like `<div>` or `<section>`

It supports three syntax variations:&#x20;

1. **Text Directives (Inline):** `:name[content]{#id .class}`
2. **Leaf Directives (Single element block):** `::name[content]{key="value"}`
3. **Container Directives (Wrapping blocks):**&#x20;

:::name{.className} This is a container for **any** markdown content. :::

### Example

Here’s the code for embed web component:

```jsx
class Youtube extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${this.getAttribute('videoid')}`
    this.innerHTML = `<div style="width: 100%; min-height: 500px;"><iframe class="w-full min-h-[500px]" src="https://www.youtube.com/embed/${this.getAttribute(
      'videoId',
    )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
  }
}

customElements.define('wc-youtube', Youtube)
```

