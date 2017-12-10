import component from './cell.vue'

component.install = (Vue) => {
  Vue.component(component.name, component);
};

export default component;