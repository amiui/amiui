import Vue from 'vue'
import AmModal from '../packages/modal/index'

Vue.use(AmModal);

const isFunc = f => {
  return typeof f === 'function'
};
const isObj = f => {
  return typeof f === 'object'
};
const isStr = f => {
  return typeof f === 'string'
};

const AmiuiFunc = {
  /**
   * 函数式调用 asseekMiuiModal
   * @param options 与netMiuiModal参数一致
   * shadeClose:bool              是否点击阴影关闭
   * dialog:string                提示文字  不能为html
   * content:string               内容 可以为html BUG 只能用'不能使用"
   * success:function(vm,el)      弹出成功回调
   * yes:function(vm,el)          确定按钮回调
   * cancel:function(vm,el,type)  取消或阴影点击关闭前的回调 return false 阻止关闭
   * end:function()               销毁后回调
   * type:string                  层类型  select iframe
   * url:string                   type=iframe时的url  传参即为iframe层
   * select:array                 type=select时的选项  传参即为select层
   * selectMulti:bool             type=select时的是否可以多选
   * selectSlot:string            type=select时Slot的内容
   * selected:function            type=select时选择回调
   */
  modal(options) {
    const attrStr = ['title', 'dialog'];
    const attrAll = ['height', 'maxHeight', 'zIndex', 'select', 'selectMulti', 'animation', 'btn'];
    let attr = [
      ':visible="visible"',
      ':close-on-click-modal="false"',
      '@yes="yes"',
      '@cancel="cancel"',
      '@shade-click="shadeClick"',
      '@modal-show="modalShow"',
      '@modal-hide="modalHide"'
    ];
    for (let prop in options) {
      if (attrStr.indexOf(prop) > -1) {
        attr.push(prop + '="' + options[prop] + '"')
      } else if (attrAll.indexOf(prop) > -1) {
        const val = isObj(options[prop]) ? JSON.stringify(options[prop]) : options[prop];
        prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();  //驼峰转横线
        attr.push(':' + prop + "='" + val + "'")
      }
    }
    attr = attr.join(' ');

    let el = document.createElement('DIV');
    let html = options.content || '';

    if (options.type === 'iframe' || options.url) {
      html += `<iframe class="amiui-iframe__body" frameborder="0" src="${options.url}"></iframe>`
    } else if (options.type === 'select' || options.select) {
      options.select.forEach((item) => {
        if (item.selected === undefined) {
          item.selected = false;
        }
      });
      html += `<am-select ref="select" :select="select" :select-multi="selectMulti" @selected="selected">${options.selectSlot || ''}</am-select>`
    }

    el.innerHTML = `<am-modal ${attr}>${html}</am-modal>`;
    document.body.appendChild(el);

    const vmData = options.data || {};
    vmData.visible = false;
    vmData.hideEnd = false;
    vmData.shade = options.shade !== undefined ? options.shade : true;
    vmData.select = options.select || [];
    vmData.selectMulti = options.selectMulti || false;

    const vm = new Vue({
      el: el,
      data: vmData,
      methods: {
        yes() {
          options.yes && options.yes(vm, vm.$el)
        },
        cancel(type) {
          console.log(1)
          if (!options.cancel || options.cancel(vm, vm.$el, type || 'btn') !== false) {
            this.close()
          }
        },
        modalShow() {
          options.modalShow && options.modalShow(vm, vm.$el)
        },
        modalHide() {
          options.modalHide && options.modalHide(vm, vm.$el);
          this.hideEnd && vm.$destroy()
        },
        shadeClick() {
          if (options.shadeClose === undefined || options.shadeClose) {
            this.cancel('shade');
          }
        },
        close() {
          this.hideEnd = true;
          this.visible = false;
        },
        selected(item) {
          options.selected && options.selected(item, vm)
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.visible = options.shade !== undefined ? options.shade : true;
          options.success && options.success(vm, el)
        })
      },
      destroyed() {
        vm.$el.parentNode.removeChild(vm.$el);
        options.end && options.end()
      }
    });
  },
  /**
   * 提示信息框
   * @param dialog  提示文字 或 options
   * @param options  options 或标题  或确定回调
   * @param yes  确定回调
   */
  alert(dialog, options, yes) {
    const amiui = AmiuiFunc;
    let option = isObj(dialog) ? dialog : isObj(options) ? options : {};
    let y = option.yes;
    option.btn = option.btn || ['确定'];
    option.shadeClose = option.shadeClose !== undefined ? true : option.shadeClose;
    option.yes = (v, e) => {
      const b = isFunc(options) ? options : yes;
      if (b || y) {
        const _b = !b || b(v, e) !== false;
        const _y = !y || y(v, e) !== false;
        if (_b && _y) {
          v.close()
        }
      } else {
        v.close()
      }
    };
    option.dialog = isStr(dialog) ? dialog : option.dialog;
    option.title = isStr(options) ? options : (option.title !== undefined ? option.title : '提示');
    amiui.modal(option)
  },
  /**
   * 询问框
   * @param dialog  提示文字 或 options
   * @param options  options 或标题  或确定回调
   * @param yes  确定回调
   * @param cancel  取消回调
   */
  confirm(dialog, options, yes, cancel) {
    const amiui = AmiuiFunc;
    let option = typeof dialog === 'object' ? dialog : typeof options === 'object' ? options : {};
    let y = option.yes;
    let c = option.cancel;
    let _y = isFunc(options) ? options : (isFunc(yes) ? yes : null);
    let _c = isFunc(options) && isFunc(yes) ? yes : (isFunc(cancel) ? cancel : null);
    option.btn = option.btn || ['确定', '取消'];
    option.shadeClose = option.shadeClose !== undefined ? true : option.shadeClose;
    option.yes = (v, e) => {
      _y && _y(v, e);
      y && y(v, e);
    };
    option.cancel = (v, e, t) => {
      if (c || _c) {
        const $c = c && c(v, e, t) === false;
        const $_c = _c && _c(v, e, t) === false;
        if ($c || $_c) {
          return false
        }
      }
    };
    option.dialog = isStr(dialog) ? dialog : option.dialog;
    option.title = isStr(options) ? options : (option.title !== undefined ? option.title : '消息');
    amiui.modal(option)
  }
};

Vue.prototype.$amiui = AmiuiFunc;

export default AmiuiFunc;