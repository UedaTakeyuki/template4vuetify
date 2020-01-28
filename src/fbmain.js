/** 
 * @file firebase suppliments 
 * 
 * @author ueda@laterierdueda.com (Dr. Takeyuki UEDA)
 * @copyright Copyright© Atelier UEDA 2018 - All rights reserved.
 * 
  * 
 * @see http://usejsdoc.org/
 */

import firebase from 'firebase'
//import firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'

/*
var login_id = document.getElementById('login_id');
var actionElement = document.getElementById('actionElement');
var loader = document.getElementById('loader');
var next = document.getElementById('next');
actionElement.style.display = 'none';
var lastPicFileName; 
*/

//logout
export function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = 'index.php';
//  }).catch(function(error) {
  }).catch(function() {
    // An error happened.
//    console.log(error);
  });
}

/*
export function delete_user() {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ /* true).then(function(idToken) {
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
    });
  });
}
*/

/*
function set_userinfo(user){
  change_username.current_username = user.displayName;
  nav_menu.displayName = user.displayName;
  change_emailaddress.current_emailaddress = user.email;
}
*/

//next.addEventListener('click', () => { // for non ES6 browser like Safari9
/*
next.addEventListener('click', function() {
  window.location.href = 'index.php';
});
*/

// Initialize the FirebaseUI Widget using Firebase.
//export var ui = new firebaseui.auth.AuthUI(firebase.auth());


// ACS for sendEmailVerification() 
export var actionCodeSettings = {
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

