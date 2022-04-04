<template>
  <h1>{{ msg }}</h1> 

  <button @click="realTime.count++">count is: {{ realTime.count }}</button>
  <button @click="handleclick">点击跳转其它路由</button>
  <p>Edit <code>Views/HelloWorld.vue</code> to test hot module replacement.</p>
</template>
 
<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Index',
  props: { msg: { type: String, default: '欢迎来到vue3' } },
  setup(props) {
    const router = useRouter();
    let realTime = reactive({ count: 0 });
 
    function handleclick() {
      router.push({ path: '/table' })
    }
    return {
      msg: props.msg,
      msg: '欢迎来到vue3',
      realTime,
      handleclick
    }
  }
})
</script>