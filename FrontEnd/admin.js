
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
    showModals();
    addForm();
    crossClose();
}

function crossClose() {
    const modal = document.getElementById('modal');
    const cross = document.getElementById('cross');
        cross.addEventListener('click', () => {
            modal.close()
            modal.innerHTML = `
                               <div id="modal-cross">
                                    <button id="cross"><a href="#" role="button"><img src="./assets/icons/cross.png" alt="cross"></a></button>
                                </div>
                                <h3>Galerie photo</h3>
                                <div id="modal-gallery">
                                </div>
                                <button id="addForm">Ajouter une photo</button>  
                                `;
        });  
}

function showModals() {
    const editWorksBtn = document.getElementById('edit-works-btn');
    const modal = document.getElementById('modal');
    // modal.innerHTML = `
    //        <div id="modal-cross">
    //             <button id="cross"><a href="#" role="button"><img src="./assets/icons/cross.png" alt="cross"></a></button>
    //         </div>
    //         <h3>Galerie photo</h3>
    //         <div id="modal-gallery">
    //         </div>
    //         <button id="addForm">Ajouter une photo</button>  
    //         `;
    editWorksBtn.addEventListener('click', () => {
        modal.showModal(run2());

    });
}


function addForm() {
    const modal = document.getElementById('modal');
    const addForm = document.getElementById("addForm");
    addForm.addEventListener('click', function() {
        modal.innerHTML = `
                            <div id="modal-cross">
                                <button id="cross"><a href="#" role="button"><img src="./assets/icons/cross.png" alt="cross"></a></button>
                            </div>
                            <h3>Ajout photo</h3>
                            <div class="divAjoutPhotos" id="divAjoutPhotos">
                               
                                <div class="divAddWork">
                                <div class="addWorkFormDiv">
                                <form class="addWorkForm" method="post">
                                <div class="dropzone" id="dropzone" >
                                <i class="fa fa-thin fa-image faAddImgSquare"></i>
                                <label class="addImgLabel"><p>+ Ajouter Photo </p><p class="addWorkFormMandatoryStar">*</p><input type="file" accept="image/png, image/jpeg" name="image" id="imageInput" required> </input></label>
                                <p> jpg, png: 4mo max</p>
                                </div>
                                  
                                    <label class="addWorkLabel"><p>Titre</p> <p class="addWorkFormMandatoryStar">*</p></label>
                                    <input class="addWorkTitle" name="title" required></input>
                                    <label class="addWorkLabel"><p>Catégorie</p><p class="addWorkFormMandatoryStar">*</p></label>
                                    <select type="select" class="selectCategory" name="category" required>
                                    </select>
                                    <hr class="hrLineAddWorkForm">
                                    <input type="submit" value="Ajouter Photo"  id="confirmAddWork">
                                  </form>
                                </div>
                              </div>
                         `;
       genererCategories();
       crossClose();
    })
}

async function genererCategories() {
  const getCat = await getCategories();
  const selectCategory = document.querySelector('.selectCategory');
  selectCategory.innerHTML = "";

  // on utilise l'Array créé précédemment pour créer les options des catégories
  for (cat of getCat) {
    const categorie = document.createElement('option');
    categorie.className = `selectCategoryElement`;
    categorie.id = cat.name;
    // categorie.value = cat.id; // !! On enverra cette valeur à la bdd lors du push !!
    categorie.innerText = cat.name;
    selectCategory.appendChild(categorie);
  }
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


async function addWork() {

}


const run2 = async()=>{
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();
    var categories = await getCategories();
    renderWorks(works,0,"modal-gallery");
    trashButton(works);
    isLoggedIn(works, categories);
}    