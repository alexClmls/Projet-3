function renderWorks(works,id,domElementId) {
    
    const containers = document.getElementById(domElementId);
    containers.innerHTML = "";    
    
    for(let work of works) {


        if (work.categoryId == id || id ==0) {
            
            const figure = document.createElement("figure");
            figure.id = work.id;

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

	const cat = document.getElementById("categories");
	cat.innerHTML = "";
	const catContainer = document.createElement("div");
	catContainer.id = "categories-container";
	const buttonAll = document.createElement("button");
	buttonAll.innerText = "Tous";
	buttonAll.className = "button-filter";
	buttonAll.addEventListener("click", function() {

	document.getElementById("gallery").innerHTML = "";
	renderWorks(works,0,"gallery");
	})
	catContainer.appendChild(buttonAll);

	for (let category of categories) {
							
		const buttonId = category.id

		const buttonFilter = document.createElement("button");
		buttonFilter.innerText = category.name;
		buttonFilter.className = "button-filter";
		buttonFilter.addEventListener("click", function() {

		document.getElementById("gallery").innerHTML = "";
		renderWorks(works,buttonId,"gallery");
		})
		catContainer.appendChild(buttonFilter);
	}
	cat.appendChild(catContainer);
}
									

const btnLogin = document.getElementById("btnLogin");

function displayNone(element) {
	for (var i = 0; i < element.length; i++) {
    	element[i].style.display = 'none';
  }
}

function logout(btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        btnLogin.innerText = "login";
        run();
    });
}


function isItLogged(works, categories) {
	let token = localStorage.getItem("token")|| "";
	const btnLogin = document.getElementById("btnLogin");
	if (token != "") {
		renderWorks(works,0,"gallery");
		logout(btnLogin);
		editPage();
		showModals();
	    btnLogin.innerText = 'logout';
	} else {
		destroyEdit();
		renderWorks(works,0,"gallery");
		renderCategories(categories, works);
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
	isItLogged(works, categories);
}

run()
	
