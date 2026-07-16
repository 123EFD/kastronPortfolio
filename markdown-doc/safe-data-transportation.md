# Safe Data Transportation

#### Reference:

{% embed url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape" %}

{% embed url="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" %}

{% embed url="https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa" %}

{% embed url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" %}

{% embed url="https://developer.mozilla.org/en-US/docs/Web/API/FileReader/error_event" %}

* raw binary data (like the pixels of an image) or complex Unicode characters (like emojis or Chinese characters) can get mangled or break the JSON structure when sending to an API&#x20;
* Base64 encoding solves this by translating that messy data into a universally safe alphabet of 64 standard characters (A-Z, a-z, 0-9, +, and /).

#### `FileReader` API

* user drops an image into the browser, it exists as a raw `File` object (a Blob of binary data)
* Cannot directly run mathematical string conversions on a physical file
* have to use the browser's built-in `FileReader` to crack it open.
* reading a file takes time (especially a large image), it happens asynchronously in the background. In js, need to use promise&#x20;
* `onloadend`: This is an event listener.
  * It acts as a trigger that says, _"Do not run this block of code until the file has completely finished loading_
  * After that, the translated Base64 data is sitting safely inside `reader.result`.
* `onerror`: This is the safety net. If the file is corrupted, unreadable, or the user unplugs their hard drive halfway through the read process, this event fires so your app can <mark style="color:$warning;">**throw a proper error instead of crashing silently.**</mark>

#### Unicode Base64 Chain

* Javascript limitation : built-in Base64 encoder (`btoa`) only accepts basic ASCII characters
* `btoa()` will instantly throw a `DOMException` error and crash when contains emoji, smart quote, foreign character&#x20;
* Solution : `btoa(unescape(encodeURIComponent(text)))`&#x20;
  * `encodeURIComponent()`: This function takes your raw text and <mark style="color:$info;">**escapes all the "dangerous" or complex characters into UTF-8 byte sequences**</mark>
  * if you type a space, it turns it into `%20`. If you type a 🚀 emoji, it turns it into `%F0%9F%9A%80`.
* `unescape()`: This is an **older JavaScript function**. It <mark style="color:$primary;">**looks at those**</mark><mark style="color:$primary;">**&#x20;**</mark><mark style="color:$primary;">**`%XX`**</mark><mark style="color:$primary;">**&#x20;**</mark><mark style="color:$primary;">**sequences and translates them back into raw, 8-bit bytes**</mark>. It <mark style="color:$info;">**strips the**</mark><mark style="color:$info;">**&#x20;**</mark><mark style="color:$info;">**`%`**</mark><mark style="color:$info;">**&#x20;**</mark><mark style="color:$info;">**formatting but keeps the underlying binary data intact.**</mark>
* `btoa()` (Binary to ASCII): `unescape()` has <mark style="color:$primary;">**transformed text into a perfectly safe string of raw 8-bit bytes**</mark>
  * It reads those bytes and translates them into the <mark style="color:$primary;">**final Base64 string that GitHub requires.**</mark>

