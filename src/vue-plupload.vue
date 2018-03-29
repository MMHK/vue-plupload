<template>
    <input ref="btn" :class="className" :value="text" type="button" />
</template>
<style>
.plupload-btn {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
</style>
<script>
var Vue = global.Vue || require("vue");
var plupload = require("plupload");
var merge = require('lodash/merge');

var uploaderDefaultOption = {
    runtimes: 'html5,html4'
};

module.exports = Vue.extend({
    props: {
        className: {
            type: String,
            default: "plupload-btn"
        },
        text: {
            type: String,
            default: "Upload"
        },
        options: {
            type: Object,
            default: function () {
                return {

                }
            }
        }
    },
    
    methods: {
        renderUI: function() {
            var self = this;

            Vue.nextTick(function () {

                var opt = merge(uploaderDefaultOption, self.options, {

                    browse_button: self.$refs.btn,

                    init: {
                        PostInit: function (uploader) {
                            self.$emit("init", uploader)
                        },

                        FilesAdded: function (up, files) {
                            self.$emit("added", up, files)
                        },

                        UploadProgress: function (up, file) {
                            self.$emit("progress", up, file)
                        },

                        FileUploaded: function(up, file, result) {
                            self.$emit("uploaded", up, file, result)
                        },

                        Error: function (up, err) {
                            self.$emit("error", up, err)
                        }
                    }
                })

                var uploader = new plupload.Uploader(opt);

                uploader.init();
            });
        }
    },

    mounted: function () {
        this.renderUI();
    },
    
    updated: function() {
        this.renderUI();
    }
});

</script>
