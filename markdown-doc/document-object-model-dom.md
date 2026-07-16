# Document Object Model (DOM)

Reference:

{% embed url="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" %}

{% embed url="https://prosemirror.net/docs/guide/" %}

* connects web pages to scripts or programming languages by representing the structure of a document
* e.g. : HTML represent as web page in memory / Javascript (most common)
* represents a document with a logical tree
  * each branch have node as tree end, each node contains objects
* DOM methods allow programmatic access to the tree to change the style , structure,&#x20;
* Event handlers are attached to the nodes to execute them when trigger
* **DOM tree** is a [tree structure](https://en.wikipedia.org/wiki/Tree_structure) whose <mark style="color:$info;">**nodes represent an HTML or XML**</mark> document's <mark style="color:$info;">**contents**</mark>

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

```html
<html lang="en">
  <head>
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>
```

* When a <mark style="color:$primary;">**web browser parses an HTML document**</mark>, it **builds a DOM tree** and then uses it to display the document.

#### Concepts and usage&#x20;

* Document Object Model (DOM) is a programming <mark style="color:$primary;">**interface for web documents**</mark>
* represents the page so that programs can change the document structure, style, and content
* DOM represents the document as nodes and objects
* it can be modified with a scripting language such as JavaScript.

the DOM specifies that the `querySelectorAll` method in this code snippet must return a list of all the [`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p) elements

```javascript
const paragraphs = document.querySelectorAll("p");
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName);
```

* For example, the `document` object that represents the document itself, any `table` objects that implement the [`HTMLTableElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement) DOM interface for accessing HTML tables, and so forth, are all objects.

{% hint style="info" %}
DOM is built using multiple APIs that work together
{% endhint %}
