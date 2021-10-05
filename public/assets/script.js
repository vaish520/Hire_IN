firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      window.location.replace("/index");
      // ...
    } else {
      // User is signed out
      window.location.replace("/login");
      // ...
    }
  });
  

function login(){
    var Email = document.getElementById("email").value;
    var Password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(Email, Password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :"+ errorMessage);      // ..
    });
}