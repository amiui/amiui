<template>
  <div v-clickoutside="handleLevel">
    <div :class="{'amiui-searchbar': true, 'amiui-searchbar__show--action':showAction}" :style="{backgroundColor: background}">
      <div v-if="showReturn" class="amiui-searchbar__return" @click="returnClick"><i class="am-icon-return"></i></div>
      <div class="amiui-searchbar__input--wrap">
        <i class="am-icon-search"></i>
        <input class="amiui-searchbar__input" ref="input" :value="value" @input="input" type="search" :placeholder="placeholder" @focus="isFocus = true">
        <i class="am-icon-clear" v-show="isFocus && value" @touchstart.prevent="input()"></i>
      </div>
      <div v-if="showAction" class="amiui-searchbar__action">
        <p v-if="!$slots.action" class="amiui-searchbar__action--text" @click="actionClick">{{ typeof showAction === 'string' ?  showAction : '确定' }}</p>
        <p v-if="$slots.action"><slot name="action"></slot></p>
      </div>
    </div>
    <div v-if="borderBottom" class="amiui-border__bottom"></div>
    <slot></slot>
  </div>
</template>
<script>
  import './searchbar.css'
  import '../../src/utils/clickoutside'
  import '../../src/fonts/iconfont.css'

  export default {
    name: 'AmSearchBar',
    props: {
      placeholder: String,
      value: String,
      background: {type: String, 'default': 'transparent'},
      showAction: {type: Boolean, 'default': false},
      showReturn: {type: Boolean, 'default': false},
      borderBottom: {type: Boolean, 'default': true}
    },
    watch: {},
    data() {
      return {isFocus: false}
    },
    computed: {},
    methods: {
      input(e) {
        this.$emit('input', e ? e.target.value : '');
        if (!e) {
          this.$refs.input.value = '';
          this.$refs.input.focus();
        } else if (!this.isFocus) {
          this.isFocus = true;
        }
      },
      handleLevel() {
        this.isFocus = false
      },
      actionClick() {
        this.$emit('search', this.$refs.input.value)
      },
      returnClick(){
        this.$emit('cancel')
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>