//eventos de DO

var config = {
    apiKey: "AIzaSyAylC42T8eTT0b7dsg082rrZLf1ooaxwj4",
    authDomain: "red-social-dolce.firebaseapp.com",
    databaseURL: "https://red-social-dolce.firebaseio.com",
    storageBucket: "red-social-dolce.appspot.com",
};
firebase.initializeApp(config);

const mail = document.getElementById("mail");
const register = document.getElementById("register");
const password = document.getElementById("password");
const login = document.getElementById("button-login");
const mailLogin = document.getElementById("mail-login");
const passLogin = document.getElementById("password-login");
const logoGoogle = document.getElementById("logo-google");
const logOut = document.getElementById("log-out");
const logoFacebok = document.getElementById("logo-fb")



  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   FB.getLoginStatus(function(response) {
    statusChangeCallback(response);

    const response= {
        status: 'connected',
        authResponse: {
            accessToken: '...',
            expiresIn:'...',
            signedRequest:'...',
            userID:'...'
        }
    };
});

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

if (location.pathname === "/src/views/registro.html") {
  register.addEventListener("click", () => {
      const mailUser = mail.value;
      const passwordUser = password.value;
      console.log(mailUser, passwordUser)
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(mailUser, passwordUser);
      promise
          .catch(e => alert(e.message));

  });
}else if (location.pathname === "/src/views/muro.html"){

  
logOut.addEventListener('click', () =>{
  alert("si funciono");
  firebase.auth().signOut();
  location.replace('../index.html');
})

}else{
  login.addEventListener("click", () => {
    const mailUser = mailLogin.value;
    const passwordUser = passLogin.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(mailUser, passwordUser);
     promise
     .then(location.replace("views/muro.html"))
     .catch(e => alert(e.message));
});       

logoGoogle.addEventListener("click", () => {
  alert("Si funciono");
  const baseProvider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(baseProvider)
  .catch (e => console.log(e.message));
 
})
}
 

logoFacebok.addEventListener("click", () =>{
    alert("holi")
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });
      



firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      if(!location.href.match(/muro.html$/gm)){
        location.replace('views/muro.html');
      } 
    } else {
        alert("No reegistrado");

    }
})