# vue-plupload

The [plupload](http://www.plupload.com/) wrapper for Vue 2.*。

## Example

Please read `docs` folder, [Demo](https://mmhk.github.io/vue-plupload/)


## Usage

- inject`script`, copy the file in `dist` folder.

- `CommonJS` 
    - JS:
        ```JS
        var vue = require("vue");
        var VuePluload = require("vue-plupload");
        vue.use(VuePluload);
        ```
    - Template:
    ```HTML
    <vue-plupload></vue-plupload>
    ```

- `RequireJS`
    - config:
    ```JS
    requirejs.config({
        "vue-plupload": "the/path/of/your/vue-plupload"
    })
    ``` 
    - JS:
    ```JS
    require(["vue", "vue-plupload"], function(Vue, VuePlupload){
        Vue.use(VuePlupload);
    })
    ```
    - Template:
    ```HTML
    <vue-plupload></vue-plupload>
    ```


## Options

- `className`, the classname of the button
- `text`， the text (value) of the button
- `options`， pass to `plupload` , doc：[http://www.plupload.com/docs/v2/Uploader](http://www.plupload.com/docs/v2/Uploader)
> options: `browse_button`,`PostInit`,`FilesAdded`,`UploadProgress`,`FileUploaded`,`Error` can not been overrider.

## 事件

The component will throw events of `plupload`, mapping as below:
- `init` => `PostInit`
- `added` => `FilesAdded`
- `progress` => `UploadProgress`
- `uploaded` => `FileUploaded`
- `error` => `Error`