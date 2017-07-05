<template>
    <input v-el:btn class="{{class}}" value="{{text}}" type="button" />
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
var _ = require('lodash');

var uploaderDefaultOption = {
    runtimes: 'html5,html4'
};

module.exports = Vue.extend({
    props: {
        class: {
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
    
    data : function() {
        return {
            uploader: null
        }
    },

    detached: function() {

    },
    
    watch : {
        "options" : {
            handler: function(val, oldVal) {
                var self = this;
                
                if (!self.uploader) {
                    self.renderPlupload();
                } else {
                    var opt = self.mergeOptions(val);
                    self.uploader.setOption(opt);
                }
                
                console.log("options change!");
                console.log(val)
            },
            deep: true
        }
    },
    
    methods: {
        mergeOptions: function(val) {
            var self = this;
        
            return _.merge(uploaderDefaultOption, val, {

                browse_button: self.$els.btn,

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
            });
        },
        renderPlupload: function() {
            var self = this;

            Vue.nextTick(function () {

                var opt = self.mergeOptions(self.options);

                self.uploader = new plupload.Uploader(opt);

                self.uploader.init();
            });
        }
    },

    attached: function () {
        this.renderPlupload();
    }
});

</script>
