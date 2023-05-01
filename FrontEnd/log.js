/* Le Log In */  
const submit = document.getElementById("submit");
const errorInformation = document.getElementById("errorInformation");
console.log(submit);
if (submit) {
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
	               accept: "application/json",
	               "Content-type": "application/json",
	           }
	       
	});
}	