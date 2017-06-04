<template>
  <input v-el:btn class="{{class}}" value="{{text}}" type="button"  />
</template>
<style src="../node_modules/bootstrap/dist/css/bootstrap.min.css"></style>
<script>
var Vue = require("vue");
var plupload = require("plupload");

console.log(plupload);

var vm = Vue.extend({
    props : {
        class : {
            type: String,
            default: "btn btn-primary"
        },
        text : {
            type: String,
            default: "Upload"
        },
        options : {
            type: Object,
            default: function(){
                return {

                }
            }
        }
    },


    ready : function() {
        var self = this;
        console.log(this.$els.btn);

        Vue.nextTick(function(){
            var uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : self.$els.btn,

                init: {
                    PostInit: function() {
                        self.$emit("init", uploader)
                    },
            
                    FilesAdded: function(up, files) {
                        self.$emit("added", up, files)
                    },
            
                    UploadProgress: function(up, file) {
                        self.$emit("progress", up, file)
                    },
            
                    Error: function(up, err) {
                        self.$emit("error", up, err)
                    }
                }
            });

            uploader.init();
        });
    }
});

module.exports = vm;


</script>
