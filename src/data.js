
if ((location.href.match(/muro.html$/gm))){
  
  const perfil = document.getElementById("perfil");
  const data = document.getElementById("data-user");

  perfil.addEventListener("click", () => {
    var db = firebase.firestore();
  
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let dataUser=`<div>${doc.data().speciality}</div>`
        data.insertAdjacentHTML("beforeend", dataUser);

    });
});
  })
}
