import component from './modal.vue'

component.install = (Vue) => {
  Vue.component(component.name, component);
};

export default component;