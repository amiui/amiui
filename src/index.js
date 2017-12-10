import Vue from 'vue'
import AmModal from '../packages/modal/index'
import AmSearchBar from '../packages/searchbar/index'
import AmFunc from '../src/AmiuiFunc'

const components = [
  AmModal,
  AmSearchBar
];

const install = function(Vue){
  components.map(component => {
    Vue.use(component);
  });
  Vue.prototype.$amiui = AmFunc;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  AmModal,
  AmSearchBar,
  AmFunc
}

export default {
  version: '0.0.3',
  install
}

