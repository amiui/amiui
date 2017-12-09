import searchbar from './searchbar.vue'

searchbar.install = function(Vue) {
  Vue.component(searchbar.name, searchbar);
};

export default searchbar;