let token = window.sessionStorage.getItem("token")|| ""; 
console.log(token);
/* le logout */
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("userInformation");
    window.location.replace("./index.html");
});

const editWorks = document.getElementById('edit-works');
editWorks.addEventListener('click', () => modal.showModal(run2()));

const modal = document.getElementById('modal');
// modal.addEventListener('click', () => modal.close());

const cross = document.getElementById('cross');
cross.addEventListener('click', () => modal.close());

// const modalGallery = document.getElementById('modal-gallery');
// modalGallery.addEventListener('click', (event) => event.stopPropagation());

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