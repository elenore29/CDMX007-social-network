
var config = {
  apiKey: "AIzaSyAylC42T8eTT0b7dsg082rrZLf1ooaxwj4",
  authDomain: "red-social-dolce.firebaseapp.com",
  databaseURL: "https://red-social-dolce.firebaseio.com",
  storageBucket: "red-social-dolce.appspot.com",
  messagingSenderId: "348401235503",
  projectId: 'red-social-dolce'

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
const name = document.getElementById("name");
const lastName = document.getElementById("last-name");
const speciality = document.getElementById("speciality");
const gender = document.getElementById("gender");


if ((location.href.match(/registro.html$/gm))) {
  register.addEventListener("click", () => {
    const mailUser = mail.value;
    const passwordUser = password.value;
    const nameUser = name.value;
    const lastNameUser = lastName.value;
    const specialityUser = speciality.value;
    const genderUser = gender.value;
    const auth = firebase.auth();
    var db = firebase.firestore();
    //console.log (nameUser,lastNameUser);
    auth.createUserWithEmailAndPassword(mailUser, passwordUser);
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        if (!location.href.match(/muro.html$/gm)) {
          location.replace('muro.html');
        }
      } else {
        if (location.href.match(/muro.html$/gm)) {
          location.replace('../index.html');
        };
      };
    });

    db.collection("users").add({
      first: nameUser,
      last: lastNameUser,
      gender: genderUser,
      speciality: specialityUser
  })
  .then(function(docRef) {
    alert ("registrado");
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    alert("no registrado")
      console.error("Error adding document: ", error);
  });

  });
  //empieza vista de muro
} else if ((location.href.match(/muro.html$/gm))) {


  logOut.addEventListener('click', () => {
    alert("si funciono");
    firebase.auth().signOut();
    location.replace('../index.html');
  });

} else {
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
      .catch(e => console.log(e.message));

  })



  logoFacebok.addEventListener("click", () => {
    alert("holi")
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function (result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function (error) {
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
}



firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    if (!location.href.match(/muro.html$/gm)) {
      location.replace('views/muro.html');
    }
  } else {
    if (location.href.match(/muro.html$/gm)) {
      location.replace('../index.html');
    }
  }
})
