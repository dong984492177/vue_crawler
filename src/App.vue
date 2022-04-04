<template>
<el-form ref="ruleForm" label-width="100px">
    <img alt="Vue logo" src="./assets/logo.png" />
</el-form>

<!-- <el-icon  :size="80"><chat-line-square /></el-icon> -->
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <router-view />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
.img{
  text-align: center;
}
</style>