import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
console.log(process.env.VUE_APP_AHO);
console.log(process.env.AHO);
Vue.prototype.$aho = process.env.VUE_APP_AHO;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
