<style scoped>
</style>
<style>
</style>
<template>
  <div :class="{'amiui-cells': true , 'amiui-cells_empty_line_left':!cellLineLeft, 'amiui-cells_active': activeType, 'amiui-cells__padding-high': paddingHigh}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'AmCells',
    props: {
      cellLineLeft: {   //子cell的底线是否带偏移量
        type: Boolean, 'default': true
      },
      activeType: {     //是否是选择列表项
        type: Boolean, 'default': false
      },
      paddingHigh: {     //增加上下padding
        type: Boolean, 'default': false
      },
      access: {      //是否使子cell都用跳转样式
        type: Boolean, 'default': false
      },
      swipedBtn:{       //是否使所有子cell支持滑动删除
        type: Boolean, 'default': false
      }
    },
    watch: {},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    created() {
    },
    mounted() {
    }
  }
</script>