import VuePlupload  from './src/components/vue-plupload.vue'


const install = function(Vue) {
    Vue.component('vue-plupload', VuePlupload)
};


module.exports = {
    install: install,
    __esModule: false
}