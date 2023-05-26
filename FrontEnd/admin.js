
const token = localStorage.getItem("token")|| "";
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

function destroyEdit() {
    banner.innerHTML = "";
    editIntro.innerHTML = "";
    editWorks.innerHTML = "";
    displayNone(banner);
    displayNone(editIntro);
    displayNone(editWorks);
}

function modal() {
    showModals();
    addForm();
    crossClose();
}

function rmodal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
                               <div id="modal-cross">
                                    <button id="cross"><a href="#" role="button"><img src="./assets/icons/cross.png" alt="cross"></a></button>
                                </div>
                                <h3>Galerie photo</h3>
                                <div id="modal-gallery">
                                </div>
                                <button id="addForm">Ajouter une photo</button>
                                <button id="clear">Supprimer la galerie</button>  
                             `;                         
}


function crossClose() {
    const modal = document.getElementById('modal');
    const cross = document.getElementById('cross');
        cross.addEventListener('click', () => {
            modal.close()
            rmodal();
            run();                 
        });  
}

function showModals() {
    const editWorksBtn = document.getElementById('edit-works-btn');
    const modal = document.getElementById('modal');
    editWorksBtn.addEventListener('click', () => {
        modal.showModal(run2());

    });
}

function backModal() {
    let aLeft = document.getElementById("arrow-left");
    aLeft.addEventListener("click", (e) => {
        e.preventDefault();
        rmodal();
        run2(); 
    }) 
}

function addForm() {
    const modal = document.getElementById('modal');
    const addForm = document.getElementById("addForm");
    addForm.addEventListener('click', function() {
        modal.innerHTML = `
                            <a href= "#' role="button id= "arrow-left">
                               <i class="fa-light fa-arrow-left"></i>
                            </a>   
                            <div id="modal-cross">
                                <button id="cross"><a href="#" role="button"><img src="./assets/icons/cross.png" alt="cross"></a></button>
                            </div>
                            <h3>Ajout photo</h3>
                            <form id="addWorkForm" method= "post">
                                <div class="dropzone" id="dropzone" >
                                    <i class="fa-sharp fa-regular fa-image"></i>
                                    <label class="addImgLabel"><p>+ Ajouter Photo </p><input type="file" accept="image/png, image/jpeg" name="image" id="imageInput" required> </input></label>
                                    <p> jpg, png: 4mo max</p>
                                </div>
                                <input class="addWorkTitle" name="title" required></input>
                                <select type="select" class="selectCategory" name="category" required>
                                </select>
                                <hr class="hrLineAddWorkForm">
                                <input type="submit" value="Ajouter Photo"  id="confirmAddWork">
                            </form>
                         `;
       genererCategories();
       addWork();
       backModal();
       crossClose();
    })
}

async function genererCategories() {
  const getCat = await getCategories();
  const selectCategory = document.querySelector('.selectCategory');
  selectCategory.innerHTML = "";
  for (cat of getCat) {
    const categorie = document.createElement('option');
    categorie.className = `selectCategoryElement`;
    categorie.id = cat.name;
    categorie.value = cat.id;
    categorie.innerText = cat.name;
    selectCategory.appendChild(categorie);
  }
}

function addWork() {
    let confirm = document.getElementById("confirmAddWork");
    confirm.addEventListener("click", (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")|| "";
        const addWorkForm = document.getElementById('addWorkForm');
        const formData = new FormData(addWorkForm);
        fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": 'application/json',
        },
        body: formData,
        }).then(function (response) {
            if (response.status === 201) {
                rmodal();
                run2();
            }
            else if (response.status === 401) {
                localStorage.removeItem("token");
                location.replace("./login.html");
            }
        })
    });  
}

async function trashUpdate() {
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();
    renderWorks(works,0,"modal-gallery");
    renderWorks(works,0,"gallery");
    trashButton();
    allTrash();
}

function trashButton() {
    
       let token = localStorage.getItem("token")|| "";
        let figures = document.getElementById('modal-gallery').childNodes;
        
        for (figure of figures) {

            let gallery = document.getElementById("gallery");

            let trashButton = document.createElement("img");
            trashButton.src = "./assets/icons/trash.png";
            trashButton.className = "trash-button";
            
            trashButton.addEventListener("click", function() {
                let id = this.parentNode.getAttribute("id");
                fetch("http://localhost:5678/api/works/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },

                }).then(function (response) {
                        if (response.status === 204) {
                            figures.innerHTML = "";
                            trashUpdate();                        
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

function allTrash() {
    let figures = document.getElementById('modal-gallery').childNodes;
    let allClear = document.getElementById("clear");
    allClear.addEventListener("click", (e) => {
        e.preventDefault;
        for (figure of figures) {
            let id = figure.getAttribute("id");
                fetch("http://localhost:5678/api/works/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },

                }).then(function (response) {
                        if (response.status === 204) {
                            figures.innerHTML = "";
                            trashUpdate();                        
                        }
                        else {
                            console.error("Il y a une erreur");
                        }
                    })
                    .catch(function (error) {
                        console.error("Il y a une erreur:", error);
                    });
        }
    })
}


const run2 = async()=>{
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();
    var categories = await getCategories();
    renderWorks(works,0,"modal-gallery");
    trashButton();
    allTrash();
    isLoggedIn(works, categories);
}    