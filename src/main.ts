import Vue from 'vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './router/index'
import * as ElIcons from '@element-plus/icons-vue'


import axios from 'axios'
import VueAxios from 'vue-axios'



axios.defaults.baseURL= "api"
// import './reset.css'
const app = createApp(App)
// 注册Icons 全局组件
for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}
app.use(VueAxios,axios);
app.use(ElementPlus)
app.use(router)

app.mount('#app')