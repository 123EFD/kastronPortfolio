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

