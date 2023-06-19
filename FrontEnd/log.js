/* Le Log In */

const submit = document.getElementById("submit");
const errorInformation = document.getElementById("errorInformation");
errorInformation.className = "error-msg";
errorInformation.id = "error-info";
	
submit.addEventListener("click", (e) => {
   e.preventDefault();
   //récupération des réponses de l'utilisateur
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   //si un des champs n'est pas rempli, renvoie un message d'erreur
   if (!email || !password) {
      errorInformation.innerHTML = "Entrer un identifiant ou un mot de passe valide";
      errorInformation.style.display = "block";
      return;
   }
   else {
      //envoie de la requete fetch
   fetch("http://localhost:5678/api/users/login", {
         method: "POST",
         headers: {
            "accept": "application/json",
            "Content-type": "application/json",
         },
         body: JSON.stringify({email: email, password: password}),
   })
   .then(function (authResponse) {
       
      if (authResponse.status === 200) {
         return authResponse.json();
      } else {
         errorInformation.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
         errorInformation.style.display = "block";
         return Promise.reject();
        }
   })
   .then(function (userInformation) {
           
      if (userInformation) {
      localStorage.setItem("token", userInformation.token);
      location.replace("./index.html");
      }
   })
   .catch(error => console.error(error));
   }
});


