import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
//import firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'
//import fbmain from './fbmain'

Vue.config.productionTip = false;
//console.log(process.env.VUE_APP_AHO);
//console.log(process.env.AHO);
//Vue.prototype.$aho = process.env.VUE_APP_AHO;

var config = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_messagingSenderId
};
firebase.initializeApp(config);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
