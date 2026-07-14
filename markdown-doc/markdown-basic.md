# Markdown Basic

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

#### Markdown tables <a href="#markdown-tables" id="markdown-tables"></a>

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

| Header1 | Header2 | Header3 |
| ------- | ------- | ------- |
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |

{% hint style="info" %}
Note that the number of dashes doesn’t need to match the width of the column, but there must be at least one
{% endhint %}

If you want to align the text in the columns, you can use colons `:`

\- Left-align: `:-------`

\- Right-align: `-------:`

\- Center-align: `:-------:`

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

| Left  | Center | Right |
| ----- | :----: | ----: |
| cell1 |  cell2 | cell3 |
| cell4 |  cell5 | cell6 |

#### Markdown Latex formulas <a href="#markdown-formulas" id="markdown-formulas"></a>

**Inline math:** Enclose the LaTeX code with a single dollar sign $ on each side. For example, writing

`$y = mx + b$`<br>

**Display math:** For equations on their own line, you can enclose the LaTeX code with double dollar signs \$$ on each side.

`$$ E = mc^2 $$`

It will render as:![](<../.gitbook/assets/image (4).png>)

Reference:  [Latex editor](https://latexeditor.lagrida.com/)&#x20;

**Markdown diagrams**\
Tools: [Lucidchart](https://www.lucidchart.com/pages/), [draw.io](https://app.diagrams.net/)

Replace Alt text with a description of the image and url with the URL or path to the image.

**Code :** created with three backticks (` ``` `) or three tildes (`~~~`), placed on the lines preceding and following the code block

### Markdown vs. WYSIWYG editor <a href="#markdown-vs.-wysiwyg-editor" id="markdown-vs.-wysiwyg-editor"></a>

WYSIWYG stands for “What You See Is What You Get.” :

an editor that allows users to directly manipulate content on a digital platform, such as a document, webpage, or graphic, while offering an accurate view of how it will appear to end users<br>

**Portability**

* Markdown files are plain text files with minimal formatting. They can be opened and adjusted with a simple text editor on any device. In contrast, WYSIWYG editors may use proprietary file formats or require specific software to access and edit the content.
*   **Lesser risk of code errors**

    WYSIWYG editors can sometimes introduce hidden code errors, especially when copying and pasting content. Markdown, being plain text, minimizes such risks.

| **Language** | **Purpose**       | **Extension**  | **Syntax**      | **Example**                        | **Extensibility** | **Browser Support** | **Complexity** |
| ------------ | ----------------- | -------------- | --------------- | ---------------------------------- | ----------------- | ------------------- | -------------- |
| HTML         | Web pages         | .html, .htm    | Tags            | Hello, World!                      | Limited           | Universal           | Moderate       |
| XML          | Data interchange  | .xml           | Tags            | John30                             | High              | Limited             | High           |
| Markdown     | Simple formatting | .md, .markdown | Lightweight     | # Heading 1                        | Low               | Limited             | Low            |
| LaTeX        | Scientific docs   | .tex           | Command-based   | \section{Introduction}             | High              | Limited             | High           |
| YAML         | Configuration     | .yaml, .yml    | Indentation     | name: John\nage: 30                | High              | Limited             | Low            |
| JSON         | Data interchange  | .json          | Key-Value Pairs | {“name”: “John”, “age”: 30}        | Low               | Universal           | Low            |
| TOML         | Configuration     | .toml          | Table-based     | \[person]\nname = “John”\nage = 30 | High              | Limited             | Low            |
| CSV          | Tabular data      | .csv           | Comma-separated | Name, Age\nJohn, 30                | Low               | Universal           | Low            |

