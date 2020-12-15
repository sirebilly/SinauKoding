import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notification from 'vue-notification'

Vue.config.productionTip = false
Vue.use(Notification);
new Vue({
  router,
  render: h => h(App), 
  data:{
    logged_in: 'false',
  },
}).$mount('#app')

