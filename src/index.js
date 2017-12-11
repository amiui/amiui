import FastClick from 'fastclick'

import Modal from '../packages/modal/index'
import Cells from '../packages/cells/index'
import Cell from '../packages/cell/index'
import SearchBar from '../packages/searchbar/index'
import $amiui from './Amiui'

const components = [
  Modal,
  Cells,
  Cell,
  SearchBar
];

const install = function(Vue){
  components.map(component => {
    Vue.use(component);
  });
  Vue.prototype.$amiui = $amiui;
};


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  FastClick.attach(document.body); //另外打个不含 FastClick 的包
}


export {
  Modal,
  Cells,
  Cell,
  SearchBar,
  $amiui
}

export default {
  version: '0.0.33',
  install
}

