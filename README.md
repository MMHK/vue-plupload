# vue-plupload

将 plupload 封装进 Vue 1.*。

## 栗子

请参考 `docs`目录。 [Demo](https://mmhk.github.io/vue-plupload/)


## 使用

- 直接`script`引用，请直接引用 `dist` 目录下的文件。

- `CommonJS` 方式
    - js引入
        ```JS
        var vue = require("vue");
        var VuePluload = require("vue-plupload");
        vue.use(VuePluload);
        ```
    - 模版中引用，
    ```HTML
    <vue-plupload></vue-plupload>
    ```

- `RequireJS`方式
    - config:
    ```JS
    requirejs.config({
        "vue-plupload": "[你本地的vue-plupload引用路径]"
    })
    ``` 
    - js引入
    ```JS
    require(["vue", "vue-plupload"], function(Vue, VuePlupload){
        Vue.use(VuePlupload);
    })
    ```
    - 模版中引用，
    ```HTML
    <vue-plupload></vue-plupload>
    ```


## 参数

- `class`, 覆盖上传按钮的默认Class
- `text`， 覆盖上传安妮的默认文字
- `options`， `plupload`的默认参数，参考：[http://www.plupload.com/docs/v2/Uploader](http://www.plupload.com/docs/v2/Uploader)
其中，`browse_button`,`PostInit`,`FilesAdded`,`UploadProgress`,`FileUploaded`,`Error` 这些参数及事件已经内部设置，无法覆盖。

## 事件

组件默认会发送如下事件，与`plupload`默认事件一一对应。
- `init`, 对应`plupload` 事件 `PostInit`。
- `added`, 对应`plupload` 事件 `FilesAdded`。
- `progress`, 对应`plupload` 事件 `UploadProgress`。
- `uploaded`, 对应`plupload` 事件 `FileUploaded`。
- `error`, 对应`plupload` 事件 `Error`。

## 属性

组件暴露 一个属性 `uploader` 指向所创建的 `plupload` 实例。