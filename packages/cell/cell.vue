<style scoped>
</style>
<style>
</style>
<template>
  <div :class="{
        'amiui-cell': true,
        'amiui-cell_access': $_swiped ? false : $_access,
        'amiui-cell_active': active,
        'amiui-cell_swiped': $_swiped
       }">
    <div class="amiui-cell__hd"
         v-if="showHd">
      <i v-if="icon" :class="icon"></i>
      <slot name="hd"></slot>
      {{ hd }}
    </div>
    <div class="amiui-cell__bd"
         @touchstart="_touchStart"
         @touchmove="_touchMove"
         @touchend="_touchEnd"
         :style="swipeStyle"
         v-if="showBd">
      <template v-if="$_swiped">
        <am-cell :bd="bd" :ft="ft" :access="$_access">
          <slot></slot>
          <slot name="ft"></slot>
        </am-cell>
      </template>
      <template v-else>
        <slot></slot>
        {{ bd }}
      </template>
    </div>
    <div class="amiui-cell__ft"
         v-if="showFt">
      <template v-if="$_swiped">
        <a class="amiui-swiped-btn amiui-swiped-btn_warn"
           @click="remove">
          删除
        </a>
      </template>
      <template v-else>
        <slot name="ft"></slot>
        {{ ft }}
      </template>
    </div>
  </div>
</template>
<script>
  import './cell.css';

  export default {
    name: 'AmCell',
    props: {
      active: {     //父cells必须启用activeType 否则会有样式问题
        type: Boolean, 'default': false
      },
      access: {      //是否使用跳转cell样式
        type: Boolean, 'default': false
      },
      hd: {
        type: String, 'default': ''
      },
      bd: {
        type: String, 'default': ''
      },
      ft: {
        type: String, 'default': ''
      },
      icon: {
        type: String, 'default': ''
      },
      swipedBtn: {       //支持滑动删除
        type: Boolean, 'default': false
      }
    },
    watch: {},
    data() {
      return {
        startX: 0,       //触摸位置
        moveX: 0,        //滑动时的位置
        disX: 0,         //移动距离
        delWidth: 60,    //删除宽度
        swipeStyle: '',
      }
    },
    computed: {
      $_isCells() {
        return this.$parent.$options._componentTag === 'am-cells'
      },
      $_access() {
        return this.access ||
          (this.$_isCells ? this.$parent.access : false)
      },
      $_activeType() {
        return this.$_isCells ? this.$parent.activeType : false
      },
      $_swiped() {
        return this.swipedBtn ||
          (this.$_isCells ? this.$parent.swipedBtn : false)
      },
      showHd() {
        return this.hd || this.$_activeType || this.icon || this.$slots.hd
      },
      showBd() {
        return this.bd || this.$slots.default
      },
      showFt() {
        return this.ft || this.$_access || this.$slots.ft || this.$_swiped
      }
    },
    methods: {
      _touchStart(e) {
        if (this.$_swiped && e.touches.length === 1) {
          this.startX = e.touches[0].clientX + (this.disX >= this.delWidth ? this.delWidth : 0);
        }
      },
      _touchMove(e) {
        if (this.$_swiped && e.touches.length === 1) {
          this.moveX = e.touches[0].clientX;
          this.disX = this.startX - this.moveX;
          const wid = this.disX <= 0 ? 0 : 
              (this.disX >= this.delWidth ? this.delWidth : this.disX );
          this.swipeStyle = `transform:translateX(-${wid}px)`;
        }
      },
      _touchEnd(e) {
        if (this.$_swiped && e.changedTouches.length === 1) {
          const endX = e.changedTouches[0].clientX;
          this.disX = this.startX - endX;
          if (this.disX < this.delWidth) {
            this.swipeStyle = 'transform:translateX(0px)';
          }
          this.startX = 0;
        }
      },
      remove(){
        this.$emit('swiped-click')
      }
    },
    created() {

    },
    mounted() {
    }
  }
</script>