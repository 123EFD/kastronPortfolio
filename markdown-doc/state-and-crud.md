---
description: >-
  handleNewPost, handleEditPost, handlePublish in Dashboard.jsx represent the C,
  R, and U in CRUD (Create, Read, Update, Delete).
---

# State and CRUD

#### State Hydration and the Active Record Pattern

| **Function**     | **Concept**                                                                                                                                                                                                                                                                       | **Real-World Analogy**                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `handleNewPost`  | State Initialization (Create): Creating an <mark style="color:$primary;">**empty data container**</mark> in the application's memory before it ever touches a database.                                                                                                           | Clicking "Compose" in Gmail. A blank text box opens, and an empty draft is saved locally, but no email is actually sent to the server yet.  |
| `handleEditPost` | Data Hydration (Read): <mark style="color:$primary;">**Fetching raw data from a remote server**</mark> (GitHub) and **"hydrating" (filling) the local React state** (`editorContent`) with that data so the user interface can <mark style="color:cyan;">**display**</mark> it.   | Opening an existing customer profile in Salesforce. The frontend asks the backend for the data, waits, and then populates the input fields. |
| `handlePublish`  | Mutation & Persistence (Update): Taking the modified local state (the Milkdown draft) and <mark style="color:cyan;">**transmitting it via a network protocol**</mark> (PUT request) to <mark style="color:$primary;">**permanently overwrite**</mark> the remote database record. | Clicking "Save" in a Shopify product admin panel. The app bundles your changes and asks the server to overwrite the old product details.    |

* GitHub is the _**remote**_ source of truth.
* React State (`currentFile` & `editorContent`) acts as the _**local**_ source of truth.
* `localStorage` acts as a _<mark style="color:$primary;">**temporary bridge**</mark>_<mark style="color:$primary;">**&#x20;**</mark><mark style="color:$primary;">**to prevent data loss**</mark>.
* `handleEditPost`  : pull data from GitHub into React, the UI is entirely disconnected from GitHub
* When typing in Milkdown , local state is mutated&#x20;
* `handlePublish`  : simply synchronizing local state back to the remote source of truth.
* **decoupling** ensures your application remains fast  because the user is interacting with local computer memory, **rather than waiting for a network request** on every single keystroke.

#### Event-Driven Architecture ： onClick()

* Dif from traditional HTML website that a link forc ethe browser to load an entirely new page from the server&#x20;
* In modern Single Page Applications (SPAs) like yours, clicking a button triggers an Event, which changes local State, which forces the UI to redraw instantly

#### How Your Functions Work Together

* The Trigger (Event): The user clicks the "Edit" button. This <mark style="color:$primary;">**fires the**</mark><mark style="color:$primary;">**&#x20;**</mark><mark style="color:$primary;">**`onClick`**</mark><mark style="color:$primary;">**&#x20;**</mark><mark style="color:$primary;">**event**</mark>, which calls `handleEditPost(post)`.
* The State Mutation (Data): `handleEditPost` <mark style="color:$primary;">**reaches out to GitHub**</mark>, **gets** the markdown text, and calls `setEditorContent(rawText)`.
* The Reaction (UI): React notices that `editorContent` has changed. It immediately <mark style="color:$primary;">**re-renders the screen, passing the new text down**</mark> into the `<MilkdownEditor />` component.
* The Persistence (Saving): As the user types, the **editor silently saves to `localStorage`**. When they click "Publish", the `onClick={handlePublish}` event is triggered, <mark style="color:$primary;">**scooping up that local data and pushing it to GitHub.**</mark>

#### How This Applies to Other Applications

* Email Clients (Gmail/Outlook): The <mark style="color:$primary;">**sidebar lists emails**</mark> (`posts.map`). Clicking one triggers a read function (`handleEditPost`), which <mark style="color:$primary;">**updates the main viewing pane with the email body**</mark> (`editorContent`).
* Note-Taking Apps (Notion/Evernote): Clicking "New Page" <mark style="color:$primary;">**triggers a create function**</mark> (`handleNewPost`), **replacing the main pane with a blank editor and a temporary ID**, exactly like your temporary `new-draft-${Date.now()}` string.
* Code Editors (VS Code): Clicking a file in the file explorer loads its contents into memory (State) and displays it in the code pane. Pressing `Ctrl+S` fires the save function (`handlePublish`), writing the memory back to the hard drive.

***

## PUT request method

* difference between `PUT` and [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) is that `PUT` is [idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent): calling it once is no different from calling it several times successively
* `PUT <request-target>["?"<query>] HTTP/1.1`&#x20;
  * [`<request-target>`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT#request-target)  ： Identifies the target resource of the request， combined with Host header
  * e.g., `http://www.example.com/path/to/file.html`
* [`<query>` Optional](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT#query) : preceded by a question-mark ? , use to carry identify info. in the form of key=value pairs
* The following `PUT` request asks to create a resource at `example.com/new.html` with the content `<p>New File</p>`:

```http
PUT /new.html HTTP/1.1
Host: example.com
Content-type: text/html
Content-length: 16

<p>New File</p>

//If the target resource does not have a current representation and 
//the PUT request successfully creates one,
HTTP/1.1 201 Created
Content-Location: /new.html

//If the target resource does have a current representation 
//and that representation is successfully modified with the state in the request
HTTP/1.1 204 No Content or 200 OK
Content-Location: /existing.html
```
