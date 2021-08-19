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
import plupload from "plupload";

const uploaderDefaultOption = {
    runtimes: 'html5,html4'
};

export default {
    name: "vue-plupload",
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

    data() {
        return {
            uploader: null
        }
    },
    
    methods: {
        renderUI() {

            this.$nextTick(() => {

                if (this.uploader) {
                    this.uploader.unbindAll();
                    this.uploader.destroy();
                }

                const opt = Object.assign(uploaderDefaultOption, self.options, {

                    browse_button: this.$refs.btn,

                    init: {
                        PostInit: (uploader) => {
                            this.$emit("init", uploader)
                        },

                        FilesAdded: (up, files) =>  {
                            this.$emit("added", up, files)
                        },

                        UploadProgress: (up, file) => {
                            this.$emit("progress", up, file)
                        },

                        FileUploaded: (up, file, result) => {
                            this.$emit("uploaded", up, file, result)
                        },

                        Error: (up, err) => {
                            this.$emit("error", up, err)
                        }
                    }
                });

                this.uploader = new plupload.Uploader(opt);
                this.uploader.init();
            });
        }
    },

    mounted() {
        this.renderUI();
    },
    
    updated() {
        this.renderUI();
    }
};

</script>
