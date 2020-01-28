/** 
 * @file firebase suppliments 
 * 
 * @author ueda@laterierdueda.com (Dr. Takeyuki UEDA)
 * @copyright Copyright© Atelier UEDA 2018 - All rights reserved.
 * 
  * 
 * @see http://usejsdoc.org/
 */
'use strict';

import firebase from 'firebase'

/*
var login_id = document.getElementById('login_id');
var actionElement = document.getElementById('actionElement');
var loader = document.getElementById('loader');
var next = document.getElementById('next');
actionElement.style.display = 'none';
var lastPicFileName; 
*/

//logout
function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = 'index.php';
  }).catch(function(error) {
  // An error happened.
    console.log(error);
  });
};

function delete_user() {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
    var param = {idToken: idToken};
    $.post("postDeleteUser.php", param,
      function(data){
        console.log(data);

    });
    firebase.auth().currentUser.delete().catch(function(error) {
      if (error.code == 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        firebase.auth().signOut().then(function() {
          // The timeout allows the message to be displayed after the UI has
          // changed to the signed out state.
          setTimeout(function() {
            alert('Please sign in again to delete your account.');
          }, 1);
        });
      }
    });;
  });
};

function set_userinfo(user){
/*
  change_username.current_username = user.displayName;
  nav_menu.displayName = user.displayName;
  change_emailaddress.current_emailaddress = user.email;
  */
}

//next.addEventListener('click', () => { // for non ES6 browser like Safari9
/*
next.addEventListener('click', function() {
  window.location.href = 'index.php';
});
*/

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());


// ACS for sendEmailVerification() 
var actionCodeSettings = {
//  url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
  url: location.href,
/*  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },*/
  handleCodeInApp: true
};

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
      $('.in_login').show();
      console.log(`Logged in as: ${user.uid}`);
      set_userinfo(user);
      show_elements(user);
//      window.location.href = 'login_success.php';
    } else {
      $('.in_login').hide();
      actionElement.style.display = 'block';
    }
  } else {
    $('.in_login').hide();
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          if (!firebase.auth().currentUser.emailVerified){
//            firebase.auth().currentUser.sendEmailVerification();
            firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
            actionElement.style.display = 'block';
            login_id.innerHTML = "";
            return false;
          }
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          loader.style.display = 'none';
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
  console.log('Nobody is logged in');
});

export default fbmain;