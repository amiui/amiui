import component from './searchbar.vue'

component.install = (Vue) => {
  Vue.component(component.name, component);
};

export default component;