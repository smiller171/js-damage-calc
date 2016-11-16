// FirebaseUI config.
/* global
  firebase
  firebaseui
  loadOptionsList
*/
var uiConfig = {
  "signInSuccessUrl": "",
  "signInFlow": "popup",
  "signInOptions": [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  "tosUrl": "<your-tos-url>",
  "callbacks": {
    "signInSuccess": function(currentUser, credential, redirectUrl) {
      // Do something.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    }
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

/* global
  initApp:true
  displayName:true
  email:true
  emailVerified:true
  photoURL:true
  uid:true
  providerData:true
  writeUserData
*/
/* exported
  displayName
  email
  emailVerified
  uid
  providerData
*/
initApp = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      emailVerified = user.emailVerified;
      photoURL = user.photoURL;
      uid = user.uid;
      providerData = user.providerData;
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
      user.getToken().then(function(accessToken) {
        $("#userImg").attr("src", photoURL);
        $("#username").text("Hi " + displayName);
        $("#userInfo").show();
        $("#firebaseui-auth-container").hide();
      });
      loadOptionsList();
    } else {
      // User is signed out.
      $("#firebaseui-auth-container").show();
      $("#userInfo").hide();
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener("load", function() {
  initApp();
});
