# Introduction to JSON Web Tokens

### Reference : [https://www.jwt.io/introduction#why-use-json-web-tokens](https://www.jwt.io/introduction#why-use-json-web-tokens) <a href="#what-is-json-web-token" id="what-is-json-web-token"></a>

### What is JSON Web Token? <a href="#what-is-json-web-token" id="what-is-json-web-token"></a>

* opens standard that defines a compact and self-contained way for security transmitting info. between parties as JSON object
* JWTs can be signed with a secret / public or private key pair using RSA
* Signed token can verify the integrity of the claims contained within it&#x20;
* Encrypted tokens hide those claims from other parties  ( party that holds the private key is the one that signed it )

### When should you use JSON Web Tokens? <a href="#when-to-use-json-web-tokens" id="when-to-use-json-web-tokens"></a>

* **Authorization**: Once the user is logged in, each subsequent request will include the JWT, allowing the user to <mark style="color:$primary;">**access routes, services, and resources**</mark> that are permitted with that token.&#x20;
  * **Single Sign On** has <mark style="color:$primary;">**small overhead**</mark> and its ability to be <mark style="color:$primary;">**easily used across different domains.**</mark>
* **Information Exchange**: securely transmitting information between parties. J
  * using public/private key pairs—you can be <mark style="color:$primary;">**sure the senders are who they say they are**</mark>.&#x20;
  * signature is <mark style="color:$primary;">**calculated using the header and the payload**</mark>, you can also verify that the content hasn't been tampered with.

### What is the JSON Web Token structure? <a href="#what-is-json-web-token-structure" id="what-is-json-web-token-structure"></a>

* Header
* Payload
* Signature

Therefore, a JWT typically looks like the following:

```
xxxxx.yyyyy.zzzzz
```

#### Header

* consists of two parts:&#x20;
  * the type of the token, which is JWT
  * **signing algorithm** being used, such as _HMAC SHA256 or RSA._

#### Payload

* contains the claims \~ statements about an entity (typically, the user) and additional data
* _registered_, _public_, and _private_ claims :
  * [**Registered claims**](https://tools.ietf.org/html/rfc7519#section-4.1):  <mark style="color:$primary;">**set of predefined claims which are not mandatory**</mark> but <mark style="color:$primary;">**recommended**</mark>, to provide a set of useful, interoperable claims.&#x20;
    * Some of them are: **iss** (issuer), **exp** (expiration time), **sub** (subject), **aud** (audience), and [others](https://tools.ietf.org/html/rfc7519#section-4.1).
* [**Public claims**](https://tools.ietf.org/html/rfc7519#section-4.2):  defined in the [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) or be defined as a URI that contains a collision-resistant namespace.
* [**Private claims**](https://tools.ietf.org/html/rfc7519#section-4.3): These are the <mark style="color:$info;">**custom claims created to share information between parties**</mark> that agree on using them and are neither _registered_ or _public_ claims.

Example of payload

`{`\
`"sub": "1234567890",`\
`"name": "John Doe",`\
`"admin": true`\
`}`

The payload is then **Base64Url** encoded to form the second part of the JSON Web Token.

#### Signature

* How to create : take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
* For example, if you want to use the HMAC SHA256 algorithm...
  * `HMACSHA256(`    \
    `base64UrlEncode(header) + "." +`    \
    `base64UrlEncode(payload),`    \
    `secret)`
* verify the message wasn't changed along the way
* verify that the sender of the JWT is who it says it is.
* you can use [jwt.io Debugger](https://www.jwt.io/) to decode, verify, and generate JWTs.

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>
