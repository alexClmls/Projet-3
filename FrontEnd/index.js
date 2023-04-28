// Récupération des projets 
pieces = fetch("http://localhost:5678/api/works").then(data => data.json())
	.then(projects => {
		for( let project of projects) {
			
			const figure = document.createElement("figure");

			const nomElement = document.createElement("figcaption");
			nomElement.innerText = project.title;

			const imageElement = document.createElement("img");
			imageElement.src = project.imageUrl;

			const imageAltElement = imageElement.getAttribute("alt");
			imageElement.alt = project.title

			const gallery = document.querySelector(".gallery");

			figure.appendChild(imageElement);
			figure.appendChild(nomElement);
			gallery.appendChild(figure);

		}
	});
