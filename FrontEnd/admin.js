
const token = localStorage.getItem("token")|| "";
const editWorks = document.getElementById("edit-works");
const editIntro = document.getElementById("edit-intro");
const banner = document.getElementById("banner");
const modal = document.getElementById('modal');
// création de la page en mode édition
function editPage() {
    banner.innerHTML = "";
    editIntro.innerHTML = "";                      
    editWorks.innerHTML = "";
    const editBanner = document.createElement("div");
    editBanner.id = "edit-banner";
    editBanner.className = "edit-banner-element";
   

    const editImgHeader = document.createElement("img");
    editImgHeader.src = "./assets/icons/penToSquareW.png"

    const editTextBanner = document.createElement("p");
    editTextBanner.innerText= "Mode édition";

    const publish = document.createElement("button");
    publish.id = "publish-btn";
    publish.className = "edit-banner-element";
    publish.innerText = "publier les changements";

    const editImg = document.createElement("img");
    editImg.src = "./assets/icons/penToSquare.png";

    const editImgs = document.createElement("img");
    editImgs.src = "./assets/icons/penToSquare.png";
    
    const editIntroButton = document.createElement("button");
    editIntroButton.className = "edit";
    editIntroButton.innerText = "modifier";
    editIntroButton.id = "edit-intro-btn";

    const editWorksButton = document.createElement("button");
    editWorksButton.className = "edit";
    editWorksButton.innerText = "modifier";
    editWorksButton.id = "edit-works-btn";

    editBanner.appendChild(editImgHeader);
    editBanner.appendChild(editTextBanner);
    banner.appendChild(editBanner);
    banner.appendChild(publish);
    editIntro.appendChild(editImg);
    editIntro.appendChild(editIntroButton);
    editWorks.appendChild(editImgs);
    editWorks.appendChild(editWorksButton);
}


function destroyEdit() {
    banner.remove();
    editIntro.remove();
    editWorks.remove();
}

function showModals() {
    const editWorksBtn = document.getElementById('edit-works-btn');
    editWorksBtn.addEventListener('click', () => {
        modal.showModal(run2());

    });
}
//création de la modale
function rModal() {

    modal.innerHTML = "";

    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";

    const modalCross = document.createElement("div");
    modalCross.id = "modal-cross";

    const cross = document.createElement("button");
    cross.id = "cross";

    const imgCross = document.createElement("img");
    imgCross.src = "./assets/icons/cross.png";
    imgCross.alt = "cross";

    const container = document.createElement("div");
    container.className = "container";

    const titleForm = document.createElement("h3");
    titleForm.innerText = "Galerie photo";

    const modalGallery = document.createElement("div");
    modalGallery.id = "modal-gallery";

    const hr = document.createElement("hr");
    hr.className = "hr-line";

    const input = document.createElement("input");
    input.type = "submit";
    input.value = "Ajouter une photo";
    input.id = "add-form";

    const clear = document.createElement("button");
    clear.id = "clear";
    clear.innerText = "Supprimer la galerie";

    cross.appendChild(imgCross);
    modalCross.appendChild(cross);
    modalContainer.appendChild(modalCross);
    container.appendChild(titleForm);
    container.appendChild(modalGallery);
    container.appendChild(hr);
    container.appendChild(input);
    container.appendChild(clear);
    modalContainer.appendChild(container);
    modal.appendChild(modalContainer);

    addForm();
    crossClose();
}
//fonction pour afficher les icones trash et supprimer au click un projet
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
                            run2();                        
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
//supprime tous les projets
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
                            run2();                        
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


function crossClose() {
    const cross = document.getElementById('cross');
        cross.addEventListener('click', () => {
            modal.close()
            rModal();
            run();                 
        });  
}

function backModal() {
    let aLeft = document.getElementById("arrow-left");
    aLeft.addEventListener("click", (e) => {
        e.preventDefault();
        run2(); 
    }) 
}
//création du form de la modale
function addForm() {
    const addForm = document.getElementById("add-form");
    addForm.addEventListener('click', function() {
        
        modal.innerHTML = "";

        const modalContainer = document.createElement("div");
        modalContainer.id = "modal-container";

        const headerForm = document.createElement("div");
        headerForm.id = "header-form";

        const leftArrow = document.createElement("img");
        leftArrow.src = "./assets/icons/Arrow_Back.png";
        leftArrow.id = "arrow-left";

        const cross = document.createElement("button");
        cross.id = "cross";

        const imgCross = document.createElement("img");
        imgCross.src = "./assets/icons/cross.png";
        imgCross.alt = "cross";

        const container = document.createElement("div");
        container.className = "container";

        const titleForm = document.createElement("h3");
        titleForm.innerText = "Ajout photo";

        const addWorkForm = document.createElement("form");
        addWorkForm.id = "add-work-form";
        addWorkForm.method = "post";

        const dropZone = document.createElement("div");
        dropZone.id = "dropzone";

        const imgDrop = document.createElement("img")
        imgDrop.id = "sharp";
        imgDrop.src = "./assets/icons/sharp.png";

        const labelImg = document.createElement("label");
        labelImg.id = "add-img-label";

        let starImg = document.createElement("p");
        starImg.id = "starImg";
        starImg.innerText = "*";

        let errorImg = document.createElement("p");
        errorImg.id = "error-img";
        errorImg.innerText = "Veuillez ajouter une image."
        errorImg.className = "error-msg";

        const pLabel = document.createElement("p");
        pLabel.innerText = "+ Ajouter photo";
        pLabel.id = "p-label";

        const input = document.createElement("input");
        input.required = "required";
        input.type = "file";
        input.accept = "image/png, image/jpeg";
        input.name = "image";
        input.id = "image-input";
        input.className = "inputs";
        input.addEventListener("change", (e) => {
            const image = new Image();
            image.id = "image";
            image.src = URL.createObjectURL(e.target.files[0]);
            displayNone(dropZone.childNodes);
            dropZone.appendChild(image);
        })

        const p = document.createElement("p");
        p.innerText = "jpg, png: 4mo max";

        const titleLabel = document.createElement("label");
        titleLabel.for = "title";
        titleLabel.id = "title-label";
        titleLabel.innerText = "Titre";

        let starTitle = document.createElement("p");
        starTitle.id = "starTitle";
        starTitle.innerText = "*";

        let errorTitle = document.createElement("p");
        errorTitle.id = "error-title";
        errorTitle.innerText = "Veuillez renseigner un titre."
        errorTitle.className = "error-msg";

        const titleInput = document.createElement("input");
        titleInput.required = "required";
        titleInput.id = "add-work-title";
        titleInput.className = "inputs";
        titleInput.name = "title";

        const catLabel = document.createElement("label");
        catLabel.for = "category"
        catLabel.id = "cat-label";
        catLabel.innerText = "Catégorie";

        let starCat = document.createElement("p");
        starCat.id = "starCat";
        starCat.innerText = "*";

        let errorCat = document.createElement("p");
        errorCat.id = "error-cat";
        errorCat.innerText = "Veuillez choisir une catégorie."
        errorCat.className = "error-msg";

        const catSelect = document.createElement("select");
        catSelect.type = "select"
        catSelect.id = "select-category";
        catSelect.className = "inputs";
        catSelect.name = "category"; 

        const hr = document.createElement("hr");
        hr.className = "hr-line";

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Valider";
        submit.id = "confirm-add-work";

        cross.appendChild(imgCross);
        headerForm.appendChild(leftArrow);
        headerForm.appendChild(cross);
        modalContainer.appendChild(headerForm);
        container.appendChild(titleForm);
        dropZone.appendChild(imgDrop);
        labelImg.appendChild(pLabel);
        labelImg.appendChild(starImg);
        labelImg.appendChild(errorImg);
        labelImg.appendChild(input);
        dropZone.appendChild(labelImg);
        dropZone.appendChild(p);
        addWorkForm.appendChild(dropZone);
        addWorkForm.appendChild(titleLabel);
        titleLabel.appendChild(starTitle);
        addWorkForm.appendChild(titleInput);
        addWorkForm.appendChild(catLabel);
        catLabel.appendChild(starCat);
        addWorkForm.appendChild(catSelect);
        addWorkForm.appendChild(hr);
        addWorkForm.appendChild(submit);
        container.appendChild(addWorkForm);
        container.appendChild(errorTitle);
        container.appendChild(errorCat);
        modalContainer.appendChild(container);
        modal.appendChild(modalContainer);               
    
        genererCategories();
        addWork();
        backModal();
        crossClose();
    })
}

//
async function genererCategories() {
  const getCat = await getCategories();
  const selectCategory = document.getElementById('select-category');
  selectCategory.innerHTML = "";
  const voidOpt = document.createElement("option");
  selectCategory.appendChild(voidOpt);
  for (cat of getCat) {
    const categorie = document.createElement('option');
    categorie.className = `select-category-element`;
    categorie.id = cat.name;
    categorie.value = cat.id;
    categorie.innerText = cat.name;
    selectCategory.appendChild(categorie);
  }
}
//récupère le nouveau projet et l'envoi dans la bdd
function addWork() {
    let confirm = document.getElementById("confirm-add-work");
    confirm.addEventListener("click", (e) => {
        e.preventDefault();
        required();
        const token = localStorage.getItem("token")|| "";
        const addWorkForm = document.getElementById('add-work-form');
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
                run2();
            }
            else if (response.status === 401) {
                localStorage.removeItem("token");
                location.replace("./login.html");
            }  
        })
    });  
}
//permet d'afficher une * et un message d'erreur si il manque un champ
function required() {
    let inputs = document.getElementsByClassName("inputs");
    let starImg = document.getElementById("starImg");
    let errorImg = document.getElementById("error-img");
    let starTitle = document.getElementById("starTitle");
    let errorTitle = document.getElementById("error-title");
    let starCat = document.getElementById("starCat");
    let errorCat = document.getElementById("error-cat");

                for(let input of inputs) {

                    switch (input.name) {
                        case "image":
                            if (input.value == "") {
                                starImg.style.display = "inline";
                                errorImg.style.display = "block";
                            }
                            else {
                                starImg.style.display = "none";
                                errorImg.style.display = "none";
                            }
                            break;
                        case "title":
                            if (input.value == "") {
                                starTitle.style.display = "inline";
                                errorTitle.style.display = "block";
                            }
                            else {
                                starTitle.style.display = "none";
                                errorTitle.style.display = "none";
                            }
                            break;
                        case "category":
                             if (input.value == "") {
                                starCat.style.display = "inline";
                                errorCat.style.display = "block";
                            }
                            else {
                                starCat.style.display = "none";
                                errorCat.style.display = "none";
                            }
                            break;
                        default:
                            console.log("Sorry");
                    }
                } 
}


const run2 = async()=>{
    rModal();
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();
    var categories = await getCategories();
    renderWorks(works,0,"modal-gallery");
    renderMainOrEdit(works, categories);
    trashButton();
    allTrash();
}    