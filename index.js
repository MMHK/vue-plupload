var VuePlupload = require('./src/vue-plupload.vue')

var vuepluploader = {
    install: function(Vue) {
        Vue.component('vue-plupload', VuePlupload)
    }
}

module.exports = vuepluploader