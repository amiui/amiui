import Vue from 'vue'
import App from './App.vue'
import Amiui from './index.js'

Vue.use(Amiui);

new Vue({
  el: '#app',
  render: h => h(App)
})
