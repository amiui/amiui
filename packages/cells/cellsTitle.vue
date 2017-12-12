<style scoped>
</style>
<style>
</style>
<template>
  <div class="amiui-cells__title">{{ title }}<slot></slot></div>
</template>
<script>
  export default {
    name: 'AmCellsTitle',
    props: {
      title: {
        type: String, 'default': ''
      },
    }
  }
</script>