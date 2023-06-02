
const token = localStorage.getItem("token")|| "";
const editWorks = document.getElementById("edit-works");
const editIntro = document.getElementById("edit-intro");
const banner = document.getElementById("editBanner");

function editPage() {
    banner.innerHTML = "";
    editIntro.innerHTML = "";                      
    editWorks.innerHTML = "";
    const editBanner = document.createElement("div");
    editBanner.id = "edit-banner";
    editBanner.className = "editBannerElement";
   

    const editImgHeader = document.createElement("img");
    editImgHeader.src = "./assets/icons/penToSquareW.png"

    const editTextBanner = document.createElement("p");
    editTextBanner.innerText= "Mode édition";

    const publish = document.createElement("button");
    publish.id = "publishChange";
    publish.className = "publishBtn editBannerElement";
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

function modal() {
    showModals();
}

function rmodal() {
    const modal = document.getElementById('modal');
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
    hr.className = "hrLineAddWorkForm";

    const input = document.createElement("input");
    input.type = "submit";
    input.value = "Ajouter une photo";
    input.id = "addForm";

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
    const addForm = document.getElementById("addForm");
    addForm.addEventListener('click', function() {
        
        const modal = document.getElementById('modal');
        modal.innerHTML = "";

        const modalContainer = document.createElement("div");
        modalContainer.id = "modal-container";

        const headerForm = document.createElement("div");
        headerForm.id = "headerForm";

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
        addWorkForm.id = "addWorkForm";
        addWorkForm.method = "post";

        const dropZone = document.createElement("div");
        dropZone.id = "dropzone";

        const imgDrop = document.createElement("img")
        imgDrop.id = "sharp";
        imgDrop.src = "./assets/icons/sharp.png";

        const labelImg = document.createElement("label");
        labelImg.className = "addImgLabel";

        const pLabel = document.createElement("p");
        pLabel.innerText = "+ Ajouter photo";

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png, image/jpeg";
        input.name = "image";
        input.id = "imageInput";
        // input.onchange = previewImg();
        input.addEventListener("change", (e) => {
            const image = new Image();
            image.id = "image";
            image.src = URL.createObjectURL(e.target.files[0]);
            displayNone(dropZone.childNodes);
            dropZone.appendChild(image);
        })
        input.required = "required";



        const p = document.createElement("p");
        p.innerText = "jpg, png: 4mo max";

        const titleLabel = document.createElement("label");
        titleLabel.for = "title"
        titleLabel.innerText = "Titre";

        const titleInput = document.createElement("input");
        titleInput.className = "addWorkTitle";
        titleInput.name = "title";
        titleInput.required = "required";

        const catLabel = document.createElement("label");
        catLabel.for = "category"
        catLabel.innerText = "Catégorie";

        const catSelect = document.createElement("select");
        catSelect.type = "select"
        catSelect.className = "selectCategory";
        catSelect.name = "category"; 

        const hr = document.createElement("hr");
        hr.className = "hrLineAddWorkForm";

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Valider";
        submit.id = "confirmAddWork";

        cross.appendChild(imgCross);
        headerForm.appendChild(leftArrow);
        headerForm.appendChild(cross);
        modalContainer.appendChild(headerForm);
        container.appendChild(titleForm);
        dropZone.appendChild(imgDrop);
        labelImg.appendChild(pLabel);
        labelImg.appendChild(input);
        dropZone.appendChild(labelImg);
        dropZone.appendChild(p);
        addWorkForm.appendChild(dropZone);
        addWorkForm.appendChild(titleLabel);
        addWorkForm.appendChild(titleInput);
        addWorkForm.appendChild(catLabel);
        addWorkForm.appendChild(catSelect);
        addWorkForm.appendChild(hr);
        addWorkForm.appendChild(submit);
        container.appendChild(addWorkForm);
        modalContainer.appendChild(container);
        modal.appendChild(modalContainer);               
    
        genererCategories();
        addWork();
        backModal();
        crossClose();
    })
}

function previewImg() {
    const file = document.getElementById("imageInput");
    console.log(file);

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
    rmodal();
    document.getElementById("modal-gallery").innerHTML = "";
    var works = await getWorks();
    var categories = await getCategories();
    renderWorks(works,0,"modal-gallery");
    trashButton();
    allTrash();
    isLoggedIn(works, categories);
}    