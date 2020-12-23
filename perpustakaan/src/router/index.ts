import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '@/views/Login.vue'
import Session from '@/common/Session'
import User from '@/entity/User'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    meta: {
      deniedAuth: true,
      requiresAuth: false,
    },
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      deniedAuth: false,
      requiresAuth: true,      
    },
    component: Home
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(Session.get()===null){
      next({
        path:"/",
        query:{
          redirect: to.fullPath
        }
      })
    }
    else next();
  }else if(to.matched.some(record => record.meta.deniedAuth)){
    Session.set(null);
    next();
  }else next();
  
})

export default router
