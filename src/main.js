import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import fbmain from './fbmain'

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
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//firebase.auth().onAuthStateChanged(user => { // for non ES6 browser like Safari9
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
/*
    if (user.email == "hba01111@nifty.com"){
      AccountDialog.showModal();
    }
*/
    if (firebase.auth().currentUser.emailVerified){
//    if (true){
      /*
      $('.in_login').show();
      console.log(`Logged in as: ${user.uid}`);
      set_userinfo(user);
      show_elements(user);
      */
//      window.location.href = 'login_success.php';
    } else {
      /*
      $('.in_login').hide();
      actionElement.style.display = 'block';
      */
    }
  } else {
    /*
    $('.in_login').hide();
    */
    ui.start('#firebaseui-auth-container', {
      callbacks: {
//        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        signInSuccessWithAuthResult: function() {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          if (!firebase.auth().currentUser.emailVerified){
//            firebase.auth().currentUser.sendEmailVerification();
            firebase.auth().currentUser.sendEmailVerification(fbmain.actionCodeSettings);
            /*
            actionElement.style.display = 'block';
            login_id.innerHTML = "";
            */
            return false;
          }
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          /*
          loader.style.display = 'none';
          */
        }
      },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      tosUrl: 'https://monitor.uedasoft.com/tos.html',
      privacyPolicyUrl: 'https://monitor.uedasoft.com/privacy.html',
      signInSuccessUrl: 'index.mdl.php',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
      // Other config options...
    });
  }
//  console.log('Nobody is logged in');
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
