function renderWorks(works,id,domElementId) {
    
    var worksId = new Set();    
    
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
            console.log(domElementId);
            figure.appendChild(imageElement);
            figure.appendChild(nomElement);
            containers.appendChild(figure);
        }       
    }
    console.log(worksId);           
}

					
function renderCategories(categories, works) {
	
	for (let category of categories) {
							
		const buttonId = category.id

		const buttonFilter = document.createElement("button");
		buttonFilter.innerText = category.name;
		buttonFilter.addEventListener("click", function() {

		document.getElementById("gallery").innerHTML = "";
		renderWorks(works,buttonId,"gallery");
		})

		const cat = document.querySelector(".categories");
		cat.appendChild(buttonFilter);
	}
}
					
function renderAll(works) {
	
	const buttonFilter = document.createElement("button");
	buttonFilter.innerText = "Tous";
	buttonFilter.addEventListener("click", function() {

	document.getElementById("gallery").innerHTML = "";
	renderWorks(works,0,"gallery");
	})

	const cat = document.querySelector(".categories");
	cat.appendChild(buttonFilter);
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
	
	if (document.URL.indexOf("index.html") >= 0) {
		renderAll(works);
		renderCategories(categories, works);
	}
}

run()
	
				
	

