<template>
    <input v-el:btn :class="class" :value="text" type="button" />
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
const Vue = global.Vue || require("vue");
const plupload = require("plupload");
const merge = require('lodash.merge');

const uploaderDefaultOption = {
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
                if (!this.uploader) {
                    this.renderPlupload();
                } else {
                    let opt = this.mergeOptions(val);
                    this.uploader.setOption(opt);
                }
            },
            deep: true
        }
    },
    
    methods: {
        mergeOptions: function(val) {
            return merge(uploaderDefaultOption, val, {
                browse_button: this.$els.btn
            });
        },
        renderPlupload: function() {
            let self = this;

            Vue.nextTick(() => {

                let opt = this.mergeOptions(this.options);

                this.uploader = new plupload.Uploader(opt);

                this.uploader.bind("PostInit", function(uploader){
                    self.$emit("init", uploader);
                });

                this.uploader.bind("FilesAdded", function(up, files){
                    self.$emit("added", up, files);
                });

                this.uploader.bind("UploadProgress", function(up, file){
                    self.$emit("progress", up, file);
                });

                this.uploader.bind("FileUploaded", function(up, file, result){
                    self.$emit("uploaded", up, file, result);
                });

                this.uploader.bind("Error", function(up, err){
                    self.$emit("error", up, err);
                });

                this.uploader.init();

            });
        }
    },

    attached: function () {
        this.renderPlupload();
    }
});

</script>
