<template>
  <div :style="style">
    <transition
        :enter-active-class="shadeEnter"
        :leave-active-class="shadeLeave">
      <div v-if="shade"
           v-show="show"
           class="amiui-shade"
           @click="shadeClick"
           :style="style">
      </div>
    </transition>
    <transition
        :enter-active-class="bodyEnter"
        :leave-active-class="bodyLeave"
        @after-enter="$emit('modal-show')"
        @after-leave="$emit('modal-hide')">
      <div class="amiui-modal" v-show="show" ref="body" :style="style">
        <div v-if="$slots.title || title"
             class="amiui-modal__title">
          <slot name="title"></slot>
          {{ title }}
        </div>
        <div class="amiui-modal__content"
             :style="contentStyle"
             ref="content">
            <div :class="dialogClass" v-if="$slots.dialog || dialog">
              <slot name="dialog"></slot>
              <div v-html="dialog"></div>
            </div>
        </div>
        <div v-if="$slots.default || content">
          <slot name="content"></slot>
          <div v-html="content"></div>
        </div>
        <div v-if="btn.length" class="amiui-modal__footer">
          <a v-if="btn.length > 1"
             class="amiui-modal__btn amiui-text--auxiliary"
             @click="cancel">
            {{ btn[1] }}
          </a>
          <a class="amiui-modal__btn amiui-text--primary"
             @click="$emit('yes')">
            {{ btn[0] }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import './modal.css'
  import '../shadow/shade.css'
  import '../animation/animation.css'

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
        type: Array, 'default' () {
          return []
        }
      },
      closeOnClickModal:{  //决定是否可以点击阴影关闭
        type: Boolean, 'default': true
      },

    },
    data() {
      return {
        anim: [
          ['amiui-anim__opacity--show', 'amiui-anim__opacity--hide'],//动画0 从不透明到透明
          ['amiui-anim__up', 'amiui-anim__up--down'],                //动画1 从下往上
          ['amiui-anim__down', 'amiui-anim__down--up']               //动画2 从上往下
        ],
        contentMaxHeight: 160
      }
    },
    computed: {
      style() {
        return {zIndex: this.zIndex}
      },
      dialogClass(){
        return 'amiui-modal__dialog' +  (this.$slots.title || this.title ? ' amiui-modal__dialog--pad' : '')
      },
      shadeEnter() {
        return this.animation > -1 && this.animation < 3 ? this.anim[0][0] : ''
      },
      shadeLeave() {
        return this.animation > -1 && this.animation < 3 ? this.anim[0][1]  : ''
      },
      bodyEnter() {
        return this.animation > -1 && this.animation < 3 ? this.anim[this.animation][0] : ''
      },
      bodyLeave() {
        return this.animation > -1 && this.animation < 3 ? this.anim[this.animation][1] : ''
      },
      contentStyle () {
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
      yes(){
        this.$emit('yes')
      },
      cancel(){
        this.show = false;
        this.$emit('cancel')
      },
      shadeClick(){
        this.$emit('shade-click');
        if (this.closeOnClickModal){
          this.cancel();
        }
      }
    }
  }
</script>