<template>
  <div id="app">
    <img src="./assets/amiui-logo.png">
    <h1>{{ msg }}</h1>
    <h2>组件库</h2>
    <ul>
      <li><a @click="amModal">modal</a></li>
      <li><a @click="amAlert">alert</a></li>
      <li><a @click="amConfirm">confirm</a></li>
    </ul>
    <i class="am-icon am-icon-plus"></i>
    <i class="am-icon am-icon-minus"></i>
    <i class="am-icon am-icon-clear"></i>
    <i class="am-icon am-icon-return"></i>
    <i class="am-icon am-icon-search"></i>
    <am-search-bar v-model="packages.searchbar.value" :show-return="true" :show-action="true" placeholder="请输入搜索内容"></am-search-bar>
    <am-modal title="模态框弹出层" :visible.sync="packages.modal.visible" :btn="['确定','关闭']" dialog="确定删除吗？"></am-modal>
  </div>

</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      msg: 'amiui测试页',
      packages:{
        modal:{
          visible:false
        },
        searchbar:{
          value:''
        }
      }
    }
  },
  methods:{
    amModal(){
      this.packages.modal.visible = true;
    },
    amAlert(){
      this.$amiui.alert('alert!',()=>{
        console.log('yes')
      })
    },
    amConfirm(){
      this.$amiui.confirm('alert!',()=>{

        console.log('yes')

      },(v,m,s)=>{
        console.log(v,m,s)
      })
    }
  }
}
</script>

<style>

</style>
