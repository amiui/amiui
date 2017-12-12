import Modal from '../packages/modal/index'
import Cells from '../packages/cells/index'
import CellsTtile from '../packages/cells/cellsTitle.vue'
import Cell from '../packages/cell/index'
import SearchBar from '../packages/searchbar/index'
import $amiui from './Amiui'

const components = [
  Modal,
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
}


export {
  Modal,
  Cells,
  CellsTtile,
  Cell,
  SearchBar,
  $amiui
}

export default {
  version: '0.0.35',
  install
}

