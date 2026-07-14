# An Introduction to OAuth 2

#### Reference :&#x20;

#### [https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)

* OAuth 2 lets third-party apps access user data without handling passwords.
* Instead of asking credentials , OAuth 2 pass it to the service provider (Google/GitHub) -> issue tokens (permissions)
* It answers “What can this app do?” not “Who is this user?”
* When you <mark style="color:$primary;">**click “Sign in with Google”**</mark> on a website, that’s **typically OpenID Connect** (which adds authentication) built on top of OAuth 2.
* OAuth 2 flow is defined by four core roles: Resource Owner, Client, Authorization Server, and Resource Server
* PKCE, or Proof Key for Code Exchange, is essential for public clients as it protects against authorization code interception attacks.
* Authorization Code grant is the <mark style="color:violet;">**standard approach for server-side applications**</mark> where the client secret can be kept confidential.
* Toekns have limited lifespan need to refresh
* Each authorization <mark style="color:blue;">**request specifies which resources and actions the application**</mark> can access, such as **read, write, or administrative privileges.**

{% hint style="info" %}
OAuth 2 is an authorization framework, not authentication

It answers “What can this app do?” not “Who is this user?”
{% endhint %}

#### Why OAuth 2

* BEFORE : asked users for passwords (security risk) or required users to share API keys (too permissive)
* OAuth 2 solves this by letting users grant limited, revocable permissions.
* E.g. : backup app can <mark style="color:$info;">**access your Google Drive files without your Google password**</mark>, and you **can revoke access anytime.**

#### [How OAuth 2 Works: The Basic Flow](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2#how-oauth-2-works-the-basic-flow)

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

* Step 1: Application requests authorization. Your application redirects the user to the authorization server with a request for specific permissions (scopes).
* Step 2: User authorizes the application. The user logs in (if needed) and approves or denies your application’s request. If approved, the authorization server generates an authorization grant.
* Step 3: Application requests access token. Your application exchanges the authorization grant (plus your client credentials) for an access token. This happens server-to-server.
* Step 4: Authorization server issues access token. If everything checks out, the server returns an access token (and optionally a refresh token) to your application.
* Step 5: Application requests protected resource. Your application uses the access token to make API requests on behalf of the user.
* Step 6: Resource server serves the resource. The API validates the token and returns the requested data if the token is valid and has the required scopes.

| Aspect         | OAuth 2                              | Authentication          | OpenID Connect                           |
| -------------- | ------------------------------------ | ----------------------- | ---------------------------------------- |
| **Purpose**    | Authorization (permissions)          | Identity verification   | Both authentication and authorization    |
| **Answers**    | “What can this app do?”              | “Who is this user?”     | “Who is this user and what can they do?” |
| **Token Type** | Access token                         | Session token/cookie    | ID token + access token                  |
| **Use Case**   | API access, third-party integrations | Login systems           | Social login, single sign-on             |
| **Example**    | App accessing your GitHub repos      | Logging into your email | “Sign in with Google” button             |
