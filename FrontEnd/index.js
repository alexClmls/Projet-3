const categories = fetch("http://localhost:5678/api/categories").then(data => data.json())
	.then(categories => {
		
	const projects = fetch("http://localhost:5678/api/works").then(data => data.json())
		.then(projects => { 
					
					function genererProjects(projects,id) {
		
								for(let project of projects) {
					
									if (project.categoryId == id || id ==0) {
										
										const figure = document.createElement("figure");

										const nomElement = document.createElement("figcaption");
										nomElement.innerText = project.title;

										const imageElement = document.createElement("img");
										imageElement.src = project.imageUrl;

										const imageAltElement = imageElement.getAttribute("alt");
										imageElement.alt = project.title;

										const gallery = document.querySelector(".gallery");

										figure.appendChild(imageElement);
										figure.appendChild(nomElement);
										gallery.appendChild(figure);
									}	
								}			
					}

					genererProjects(projects,0);

					const buttonFilter = document.createElement("button");
					buttonFilter.innerText = "Tous";
					buttonFilter.addEventListener("click", function() {

					document.querySelector(".gallery").innerHTML = "";
					genererProjects(projects,0);
					})

					const cat = document.querySelector(".categories");
					cat.appendChild(buttonFilter);
					
					for (let category of categories) {
							
						const buttonId = category.id

						const buttonFilter = document.createElement("button");
						buttonFilter.innerText = category.name;
						buttonFilter.addEventListener("click", function() {

						document.querySelector(".gallery").innerHTML = "";
						genererProjects(projects,buttonId);
						})

						const cat = document.querySelector(".categories");
						cat.appendChild(buttonFilter);
					}
						
})})




	
				
	

