function renderWorks(works,id,domElementId) {
    
    var worksId = new Set();
    const containers = document.getElementById(domElementId);
    containers.innerHTML = "";    
    
    for(let work of works) {


        if (work.categoryId == id || id ==0) {
            
            const figure = document.createElement("figure");
            figure.getAttribute("id");
            figure.id = work.id;
            worksId.add(work.id);

            const nomElement = document.createElement("figcaption");
            nomElement.innerText = work.title;

            const imageElement = document.createElement("img");
            imageElement.src = work.imageUrl;
            imageElement.className = "gallery-img"

            const imageAltElement = imageElement.getAttribute("alt");
            imageElement.alt = work.title;

            const containers = document.getElementById(domElementId);
           
            figure.appendChild(imageElement);
            figure.appendChild(nomElement);
            containers.appendChild(figure);
        }       
    }
              
}

					
function renderCategories(categories, works) {

	for (let category of categories) {
							
		const buttonId = category.id

		const buttonFilter = document.createElement("button");
		buttonFilter.innerText = category.name;
		buttonFilter.className = "button-filter";
		buttonFilter.addEventListener("click", function() {

		document.getElementById("gallery").innerHTML = "";
		renderWorks(works,buttonId,"gallery");
		})
		const cat = document.querySelector(".categories");
		cat.appendChild(buttonFilter);
	}
}
					
function renderAll(works) {
	const cat = document.querySelector(".categories");
	cat.innerHTML = "";
	const buttonFilter = document.createElement("button");
	buttonFilter.innerText = "Tous";
	buttonFilter.className = "button-filter";
	buttonFilter.addEventListener("click", function() {

	document.getElementById("gallery").innerHTML = "";
	renderWorks(works,0,"gallery");
	})
	cat.appendChild(buttonFilter);
}
					

const btnLogin = document.getElementById("btnLogin");
function displayNone(element) {
	element.style.display = 'none';
}

function display(element) {
	element.style.display = 'null';
}

function logout(btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        btnLogin.innerText = "login";
        run();
    });
}


function isLoggedIn(works, categories) {
	let token = localStorage.getItem("token")|| "";
	const btnLogin = document.getElementById("btnLogin");
	const cat = document.querySelector(".categories");
	if (token != "") {
		logout(btnLogin);
		displayNone(cat);
		editPage();
		modal();
	    btnLogin.innerText = 'logout';
	} else {
		destroyEdit();
		cat.style.display = "block";
		renderWorks(works,0,"gallery");
		renderAll(works);
		renderCategories(categories, works);
		console.log(token);
		btnLogin.addEventListener("click", (e) => {
	        e.preventDefault();
	        location.replace("./login.html");
	    });
	} 
}


async function getCategories() {
	return fetch("http://localhost:5678/api/categories").then(data => data.json())
}

async function getWorks() {
	return fetch("http://localhost:5678/api/works").then(data => data.json())
}

const run = async()=>{
	
	var categories = await getCategories();
	var works = await getWorks();
	renderWorks(works,0,"gallery");
	isLoggedIn(works, categories);
}

run()
	
