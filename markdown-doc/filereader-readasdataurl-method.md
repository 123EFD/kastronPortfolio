# FileReader: readAsDataURL() method

* [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) interface which read the contents of the specified [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)
* `readAsDataURL(blob)`

#### [Parameters](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#parameters) <a href="#parameters" id="parameters"></a>

[`blob`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#blob)

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) from which to read.

#### [Return value](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#return_value) <a href="#return_value" id="return_value"></a>

None ([`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).

**Example**\


```html
<input type="file" /><br />
<img src="" height="200" alt="Image preview" />
```

```javascript
const preview = document.querySelector("img");
const fileInput = document.querySelector("input[type=file]");

fileInput.addEventListener("change", previewFile);

function previewFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // convert image file to base64 string
    preview.src = reader.result;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
}
```

#### [Reading multiple files](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL#reading_multiple_files) <a href="#reading_multiple_files" id="reading_multiple_files"></a>

```html
<input id="browse" type="file" multiple />
<div id="preview"></div>
```

```javascript
function previewFiles() {
  const preview = document.querySelector("#preview");
  const files = document.querySelector("input[type=file]").files;

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    if (/\.(?:jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = reader.result;
        preview.appendChild(image);
      });

      reader.readAsDataURL(file);
    }
  }

  if (files) {
    Array.prototype.forEach.call(files, readAndPreview);
  }
}

const picker = document.querySelector("#browse");
picker.addEventListener("change", previewFiles);
```
