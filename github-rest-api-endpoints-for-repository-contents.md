# GitHub REST API endpoints for repository contents

{% embed url="https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28" %}

#### Get repository content

* **`application/vnd.github.raw+json`**: Returns the raw **file contents** for files and symlinks.
* **`application/vnd.github.html+json`**: Returns the **file contents in HTML**. Markup languages are rendered to HTML using GitHub's open-source [Markup library](https://github.com/github/markup).
* **`application/vnd.github.object+json`**: **Returns the contents in a consistent object format** regardless of the content type. For example, instead of an array of objects for a directory, the response will be **an object with an `entries` attribute** containing the array of objects.
* If the content is a directory, the response will be an array of objects, <mark style="color:$primary;">**one object for each item in the directory.**</mark>

{% hint style="info" %}
- To get a repository's contents recursively, you can [recursively get the tree](https://docs.github.com/rest/git/trees#get-a-tree).
- This API has an upper limit of 1,000 files for a directory. If you need to retrieve more files, use the [Git Trees API](https://docs.github.com/rest/git/trees#get-a-tree).
{% endhint %}

Parameter for GET:

* Headers : accept (string) \~ Setting to `application/vnd.github+json` is recommended.
* Path parameters : owner (string) \~required : The account owner of the repository. The name is not case sensitive.
* repo (string) \~ required : The name of the repository without the `.git` extension. The name is not case sensitive.
* Code exp.:
  * `/repos/{owner}/{repo}/contents/{path}`

```javascript
// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
  owner: 'OWNER',
  repo: 'REPO',
  path: 'PATH',
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})
```

#### Create or update file contents

* Headers `accept` string
  * Setting to `application/vnd.github+json` is recommended.
* Parameter same as GET&#x20;
* Body parameter:&#x20;
  * message(string) \~ required : commit message
  * content(String) \~ required: new file content , use Base64 encoding
  * sha(string) \~ required if you're updating file
  * branch(string) : branch name&#x20;
  * committer (object)&#x20;
  * author (object) : default to committer if omit committer

**Code example:**

`/repos/{owner}/{repo}/contents/{path}`

```javascript
// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
})

await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  owner: 'OWNER',
  repo: 'REPO',
  path: 'PATH',
  message: 'my commit message',
  committer: {
    name: 'Monalisa Octocat',
    email: 'octocat@github.com'
  },
  content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})
```

| Status code | Description                                          |
| ----------- | ---------------------------------------------------- |
| `200`       | OK                                                   |
| `201`       | Created                                              |
| `404`       | Resource not found                                   |
| `409`       | Conflict                                             |
| `422`       | Validation failed, or the endpoint has been spammed. |
