<template>
  <div id="app">
    <vue-plupload
    class-name="plupload-btn"
    text="Upload"
    :options="uploadOpt"
    @added="handleAdded" 
    @progress="handleProgress" 
    @error="handleError" 
    @uploaded="handleUploaded"></vue-plupload>
    <pre>{{PreObj}}</pre>
  </div>
</template>
<script>

import Vue from "vue";
import VuePlupload from "../index.js";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(VuePlupload);

export default {
  data() {
    return {
      OUTPUT: [],
      uploadOpt: {
          url: "http://posttestserver.com/post.php",
          filters: {
              max_file_size: '10mb',
              mime_types: [{
                  title: "Image files",
                  extensions: "jpg,gif,png"
              }]
          },
      },
    };
  },

  computed: {
    PreObj() {
      return JSON.stringify(this.OUTPUT, 0, 4);
    }
  },

  methods: {
    handleAdded: function (uploader, files) {
        files.forEach((file) => {
            this.OUTPUT.push("begin upload file:" + file.name);
        });
        uploader.start()
    },

    handleProgress: function (uploader, file) {
        this.OUTPUT.push("file:" + file.name + " uploading, progress:" + file.percent);
    },

    handleError: function (uploader, err) {
        this.OUTPUT.push("upload error:");
        this.OUTPUT.push(err);
    },

    handleUploaded: function (uploader, file, result) {
        this.OUTPUT.push("file:" + file.name + " upload complete result:" + result.response);
    }
  }
};
</script>