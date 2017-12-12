import component from './cells.vue'
import cellsTitle from './cellsTitle.vue'

component.install = (Vue) => {
  Vue.component(component.name, component);
  Vue.component(cellsTitle.name, cellsTitle);
};

export default component;