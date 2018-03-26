// NPM libraries used
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// local resources used
import App from './App.vue'

// turn off the console note about switching to production mode
Vue.config.productionTip = false

// install plugin globally for all Vue app instances
Vue.use(ElementUI)

// simply creating the Vue instance does all the necessary set up, no need to name it
new Vue({
    // HTML element to attach Vue app
    el: '#app',
    // components (HTML, CSS, and JS) used by this app
    components: {
        App
    },
    // simply render the app component as this app
    template: '<App/>'
})
