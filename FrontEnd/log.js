/* Le Log In */  
const submit = document.getElementById("submit");
const errorInformation = document.getElementById("errorInformation");
	
submit.addEventListener("click", (e) => {
   e.preventDefault();
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   
   if (!email || !password) {
       document.getElementById("errorInformation").innerHTML = "Entrer un identifiant ou un mot de passe valide";
       return;
   }
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
           return Promise.reject();
       }
       })
       .then(function (userInformation) {
           
           if (userInformation) {
           window.sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
           window.sessionStorage.setItem("token", userInformation.token);
           window.location.replace("./admin.html");
       }
       })
       .catch(error => console.error(error));
       
});

	