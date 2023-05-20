
// const modalGallery = document.getElementById('modal-gallery');
// modalGallery.addEventListener('click', (event) => event.stopPropagation());
const editWorks = document.getElementById("edit-works");
const editIntro = document.getElementById("edit-intro");
const banner = document.getElementById("editBanner");
function editPage() {
    banner.innerHTML = `
                        <p class="editBannerElement"> 
                            <img src="./assets/icons/penToSquareW.png" alt="pen-to-square">Mode Edition 
                        </p>
                        <button id="publishChange" class="publishBtn editBannerElement">publier les changements</button>
                      `;
    editIntro.innerHTML = `
                            <img src="./assets/icons/penToSquare.png" alt="pen-to-square"><button id= "edit-intro-btn" class="edit">
                            <a href="#" role="button">modifier</a></button>
                          `;                      
    editWorks.innerHTML = `
                            <img src="./assets/icons/penToSquare.png" alt="pen-to-square"><button id="edit-works-btn" class="edit">
                            <a href="#" role="button">modifier</a></button>       
                          `;
    display(banner);
    display(editIntro);
    display(editWorks);
}

function modal() {
    const editWorksBtn = document.getElementById('edit-works-btn');
    editWorksBtn.addEventListener('click', () => modal.showModal(run2()));

    const modal = document.getElementById('modal');
    // modal.addEventListener('click', () => modal.close());

    const cross = document.getElementById('cross');
    cross.addEventListener('click', () => modal.close());
}

function destroyEdit() {
    banner.innerHTML = "";
    editIntro.innerHTML = "";
    editWorks.innerHTML = "";
    displayNone(banner);
    displayNone(editIntro);
    displayNone(editWorks);
}

async function trashButton(works) {
    
       
        let figures = document.getElementById('modal-gallery').childNodes;
        
        for (figure of figures) {

            let gallery = document.getElementById("gallery");

            let trashButton = document.createElement("img");
            trashButton.src = "./assets/icons/trash.png";
            trashButton.className = "trash-button";
            
            trashButton.addEventListener("click", function () {
                let id = this.parentNode.getAttribute("id");
                fetch("http://localhost:5678/api/works/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },

                }).then(async function (response) {
                        if (response.status === 204) {
                            // figure.remove();
                            figures.innerHTML = "";
                            document.getElementById("modal-gallery").innerHTML = "";
                            var works = await getWorks();
                            renderWorks(works,0,"modal-gallery");
                            renderWorks(works,0,"gallery");
                        }
                        else {
                            console.error("Il y a une erreur");
                        }
                    })
                    .catch(function (error) {
                        console.error("Il y a une erreur:", error);
                    });
            });

            figure.appendChild(trashButton);
        }
}


const run2 = async()=>{
    
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();

    renderWorks(works,0,"modal-gallery");
    trashButton(works);
}    