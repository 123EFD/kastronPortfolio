# GitHub OAuth

The flow of authorization :

1. Users are redirected to request their GitHub identity
2. Users are redirected back to your site by GitHub
3. Your app accesses the API with the user's access token

#### [ Request a user's GitHub identity](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity) <a href="#id-1-request-a-users-github-identity" id="id-1-request-a-users-github-identity"></a>

```
GET https://github.com/login/oauth/authorize
```

| Query parameter | Type     | Required?            | Description                                                                                                                                                                                                                 |
| --------------- | -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_id`     | `string` | Required             | The client ID you received from GitHub when you [registered](https://github.com/settings/applications/new).                                                                                                                 |
| `redirect_uri`  | `string` | Strongly recommended | The URL in your application **where users will be sent after authorization**. See details below about [redirect urls](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#redirect-urls). |
| `login`         | `string` | Optional             | **Suggests a specific account to use** for signing in and authorizing the app.                                                                                                                                              |

#### [Users are redirected back to your site by GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github) <a href="#id-2-users-are-redirected-back-to-your-site-by-github" id="id-2-users-are-redirected-back-to-your-site-by-github"></a>

* user accepts request , GitHub redirects back to your site with a temporary `code` in a code parameter  + `state`
*   Exchange this `code` for an access token:&#x20;

    ```
    POST https://github.com/login/oauth/access_token
    ```

| Parameter name  | Type     | Required?            | Description                                                                                                                                                                                                                                     |
| --------------- | -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_id`     | `string` | Required             | The client ID you received from GitHub for your OAuth app.                                                                                                                                                                                      |
| `client_secret` | `string` | Required             | The client secret you received from GitHub for your OAuth app.                                                                                                                                                                                  |
| `code`          | `string` | Required             | The code you **received as a response** to Step 1.                                                                                                                                                                                              |
| `redirect_uri`  | `string` | Strongly recommended | <p>The URL in your application where users are <strong>sent after authorization.</strong> </p><p>Match against the URI originally provided when the <code>code</code> was issued, to <strong>prevent attacks against your service.</strong></p> |
| `code_verifier` | `string` | Strongly recommended | Used to **secure the authentication flow with PKCE (Proof Key for Code Exchange)**. Required if `code_challenge` was sent during the user authorization, **stored in a cookie alongside the `state` parameter** during authentication           |

Exampe of response :

```shell
access_token=gho_16C7e42F292c6912E7710c838347Ae178B4a&scope=repo%2Cgist&token_type=bearer
```

You can also receive the response in different formats if you provide the format in the `Accept` header

```json
Accept: application/json
{
  "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope":"repo,gist",
  "token_type":"bearer"
}
```

```xml
Accept: application/xml
<OAuth>
  <token_type>bearer</token_type>
  <scope>repo,gist</scope>
  <access_token>gho_16C7e42F292c6912E7710c838347Ae178B4a</access_token>
</OAuth>
```

#### [Use the access token to access the API](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api) <a href="#id-3-use-the-access-token-to-access-the-api" id="id-3-use-the-access-token-to-access-the-api"></a>

The access token allows you to make requests to the API on a behalf of a user.

```
Authorization: Bearer OAUTH-TOKEN
GET https://api.github.com/user
```

* Every time you receive an access token, you should use the token to revalidate the user's identity.&#x20;

{% hint style="info" %}
<p align="center">A user can change which account they are signed into when you send them to authorize your app, and you risk mixing user data if you do not validate the user's identity after every sign in.</p>
{% endhint %}

#### [Overview of the device flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#overview-of-the-device-flow) <a href="#overview-of-the-device-flow" id="overview-of-the-device-flow"></a>

1. Your **app requests device and user verification codes** and **gets the authorization URL** where th**e user will enter the user verification code.**
2. The app **prompts the user to enter a user verification code** at [`https://github.com/login/device`](https://github.com/login/device).
3. The app **polls for the user authentication status**. Once the user has **authorized** the device, the app will be **able to make API calls with a new access token.**

