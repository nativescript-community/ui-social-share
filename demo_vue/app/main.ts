import Vue from 'nativescript-vue';
import App from './App.vue';


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true;
// setShowDebug(true)
// Vue.config.silent = (TNS_ENV === 'production')

new Vue({
    render: h => h('frame', [h(App)])
}).$start();
