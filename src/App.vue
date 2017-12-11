<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>组件库</h2>
    <am-modal
        title="模态框弹出层"
        :visible.sync="packages.modal.visible"
        :btn="['确定','关闭']"
        dialog="确定删除吗？">
    </am-modal>
    <div class="amiui-cells__title">带说明的列表项</div>
    <div class="amiui-cells">
      <div class="amiui-cell">
        <div class="amiui-cell__bd">
          <p>标题文字</p>
        </div>
        <div class="amiui-cell__ft">说明文字</div>
      </div>
      <div class="amiui-cell amiui-cell_swiped">
        <div class="amiui-cell__bd" style="transform: translateX(-68px)">
          <div class="amiui-cell">
            <div class="amiui-cell__bd">
              <p>标题文字</p>
            </div>
            <div class="amiui-cell__ft">说明文字</div>
          </div>
        </div>
        <div class="amiui-cell__ft">
          <a class="amiui-swiped-btn amiui-swiped-btn_warn" href="javascript:">删除</a>
        </div>
      </div>
    </div>
    <button @click="amModal">modal</button>
    <button @click="amAlert">alert</button>
    <button @click="amConfirm">confirm</button>
    <am-search-bar v-model="packages.searchbar.value" :show-return="true" :show-action="true" placeholder="请输入搜索内容"></am-search-bar>
    <am-cells>
      <am-cell :swiped-btn="true" :access="true" @swiped-click="remove">可删除项目1</am-cell>
      <am-cell :swiped-btn="true" :access="true">可删除项目1</am-cell>
      <am-cell :swiped-btn="true" :access="true">可删除项目1</am-cell>
      <am-cell :swiped-btn="true">可删除项目2</am-cell>
      <am-cell>不可删除项目3</am-cell>
    </am-cells>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      msg:'amiui',
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
    remove(){
      console.log('OK')
    },
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

      },()=>{
        console.log('cancel')
      })
    }
  }
}
</script>

<style>

</style>
