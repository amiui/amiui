import component from './cell.vue'
import cells from '../cells/index.js';

component.install = (Vue) => {
  Vue.component(component.name, component);
  Vue.use(cells)
};

export default component;