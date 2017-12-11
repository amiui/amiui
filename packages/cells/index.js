import component from './cells.vue'

component.install = (Vue) => {
  Vue.component(component.name, component);
};

export default component;