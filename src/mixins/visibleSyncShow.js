/**
 * 这是很常用的一个组件混合项
 * 因为组件无法直接sync visible 所以组件绑定的是show 而props的是visible
 */
export default {
  props: {
    visible: {
      type: Boolean, 'default': false
    },
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(s) {
        this.$emit('update:visible', s);
      }
    }
  }
}