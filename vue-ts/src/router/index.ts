import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, 
  {
    path: '/register',
    name: 'Register', 
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Data.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  let logged_in:boolean
  if(localStorage.logged_in){
     logged_in= JSON.parse(localStorage.getItem('logged_in')!);
  }else{
    logged_in= false;
    localStorage.setItem('logged_in', 'false');
  }
  
  if(to.name != 'Login' && logged_in==false) next({name: 'Login'});
  else next()
})

export default router
