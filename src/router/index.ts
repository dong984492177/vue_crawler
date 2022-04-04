import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("/@/Views/index.vue")
  },
  {
    path: '/table',
    component: () => import("/@/Views/table.vue")
  },
]
 
export default createRouter({
  history: createWebHistory(),
  routes
})