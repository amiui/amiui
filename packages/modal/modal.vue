<template>
  <div :style="{zIndex: zIndex}">
    <transition
        :enter-active-class="shadeEnter"
        :leave-active-class="shadeLeave">
      <div v-if="shade"
           v-show="show"
           class="amiui-shade"
           @click="shadeClick"
           :style="{zIndex: zIndex}">
      </div>
    </transition>
    <transition
        :enter-active-class="bodyEnter"
        :leave-active-class="bodyLeave"
        @after-enter="$emit('modal-show')"
        @after-leave="$emit('modal-hide')">
      <div class="amiui-modal" v-show="show" ref="body" :style="{zIndex: zIndex}">
        <div v-if="$slots.title || title"
             class="amiui-modal__hd">
          <div class="amiui-modal__title">
            <slot name="title"></slot>
            {{ title }}
          </div>
        </div>
        <div class="amiui-modal__bd"
             :style="contentStyle"
             ref="content">
          <div class="amiui-modal__dialog"
               v-if="$slots.dialog || dialog">
            <slot name="dialog"></slot>
            {{ dialog }}
          </div>
          <div v-if="$slots.default || content">
            <slot name="content"></slot>
            <div v-html="content"></div>
          </div>
        </div>
        <div class="amiui-modal__ft">
          <a class="amiui-modal__btn amiui-modal__btn_default"
             @click="cancel"
             v-if="btn.length > 1">
            {{ btn[1] }}
          </a>
          <a class="amiui-modal__btn amiui-modal__btn_primary"
             @click="yes" >
            {{ btn[0] }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import './modal.css'
  import '../style/widget/amiui-animate/amiui-animate.css'
  import visibleSyncShow from '../../src/mixins/visibleSyncShow.js';

  export default {
    name: 'AmModal',
    mixins: [visibleSyncShow],
    props: {
      title: {       //弹出层标题字符串/空值不生成标题
        type: String, 'default': ''
      },
      shade: {       //决定弹出层是否有背景阴影
        type: Boolean, 'default': true
      },
      height: {      //弹窗content层高度
        type: Number, 'default': 0
      },
      maxHeight: {   //弹窗最大高度
        type: Number, 'default': 0
      },
      zIndex: {      //层叠顺序
        type: Number, 'default': 1000
      },
      dialog: {
        type: String, 'default': ''
      },
      content: {     //弹窗内要显示text 内容在 dialog 和select之前 需要显示html请使用不具名slot
        type: String, 'default': ''
      },
      animation: {    //弹出层动画类型 [0,1,2] 决定弹出层动画类型 传入-1不显示动画 ,
        type: Number, 'default': 1
      },
      btn: {          //弹出层的按钮最多显示2个  ['确定','取消']
        type: Array, 'default'() {
          return []
        }
      },
      closeOnClickModal: {  //决定是否可以点击阴影关闭
        type: Boolean, 'default': true
      },

    },
    data() {
      return {
        animate: [
          ['amiui-animate-fade-in', 'amiui-animate-fade-out'],                   //动画0 从不透明到透明
          ['amiui-animate-down-slide-up', 'amiui-animate-down-slide-down'],      //动画1 从下往上
          ['amiui-animate-up-slide-down', 'amiui-animate-up-slide-up']           //动画2 从上往下
        ],
        contentMaxHeight: 160
      }
    },
    computed: {
      shadeEnter() {
        return this.animation > -1 && this.animation < 3 ? this.animate[0][0] : ''
      },
      shadeLeave() {
        return this.animation > -1 && this.animation < 3 ? this.animate[0][1] : ''
      },
      bodyEnter() {
        return this.animation > -1 && this.animation < 3 ? this.animate[this.animation][0] : ''
      },
      bodyLeave() {
        return this.animation > -1 && this.animation < 3 ? this.animate[this.animation][1] : ''
      },
      contentStyle() {
        let style = {
          'max-height': this.contentMaxHeight + 'px'
        };
        if (this.height) {
          style.height = this.height + 'px'
        }
        return style;
      }
    },
    methods: {
      yes() {
        this.$emit('yes')
      },
      cancel() {
        this.show = false;
        this.$emit('cancel')
      },
      shadeClick() {
        this.$emit('shade-click');
        if (this.closeOnClickModal) {
          this.cancel();
        }
      }
    }
  }
</script>