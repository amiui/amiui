import Modal from '../packages/modal/index'
import SearchBar from '../packages/searchbar/index'
import $amiui from './Amiui'

const components = [
  Modal,
  SearchBar
];

const install = function(Vue){
  components.map(component => {
    Vue.use(component);
  });
  Vue.prototype.$amiui = $amiui;
};

/*if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}*/

export {
  Modal,
  SearchBar,
  $amiui
}

export default {
  version: '0.0.32',
  install
}

