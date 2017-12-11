import Vue from 'vue'
import App from './App.vue'
import Amiui from './index.js'
import FastClick from 'fastclick'
FastClick.attach(document.body);

Vue.use(Amiui);

new Vue({
  el: '#app',
  render: h => h(App)
})
