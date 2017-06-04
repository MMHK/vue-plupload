# vue-plupload

将 plupload 封装进 Vue 1.*。

## 栗子

请参考 `sample`目录。


## 使用

- 直接`script`引用，请直接引用 `dist` 目录下的文件。
- `CommonJS` 方式引用
```JS
var vue = require("vue);
var VuePluload = require("vue-plupload");


vue.use(VuePluload);
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