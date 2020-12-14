import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App), 
  data:{
    logged_in: 'false',
  },
}).$mount('#app')
