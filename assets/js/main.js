let map = L.map('map').setView([50.6354, 3.0623], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";
let affichage = document.querySelector(".onClick1");

fetch(url)
    .then((response) => response.json())
    .then((response) => {
        // Traitement Js
        const lieux = response.records;

        console.log(lieux[2].fields.title);

        // On fait une boucle ("lieu") pour lire les infos "/chemin" du tableau API 
        for (let lieu of lieux) {
           
            console.log(lieu.fields.geolocalisation);
            let marker = L.marker(lieu.fields.geolocalisation).addTo(map);

            marker.addEventListener("click", showme);

            function showme() {
                affichage.innerHTML = `
                <div class="onClick">
                    <div class="imgdescription">
                    <img src="./assets/img/restaurant-photo.webp" alt="Photos de restaurant" class="imgDes">
                    </div>
                    <div class="titreAdresses"><h1>${lieu.fields.title}</h1>
                    <p class="adresseDescription">${lieu.fields.contact}</p>  
                    <p class="adresseDescription">${lieu.fields.short_desc}</p>        
                    </div>
                    <div class="btndescription">
                    <button class="btnFav">Enregistrer</button>
                    <button class="btnSupp">X</button>
                    </div> 
                </div> `;

                affichage.onclick = (event) => {
                    let target = event.target;
                    if (target.className === "btnSupp") {
                        target.parentElement.parentElement.remove();
                    } else if (target.className === "btnFav") {

                        const Liste = 'favoris';
                        const favString = localStorage.getItem(Liste);
                        const favoris = JSON.parse(favString) || [];
                        let titre = lieu.fields.title;
                        let contact = lieu.fields.contact;
                        let infos = lieu.fields.short_desc;
                        const newFavoris = { titre, contact, infos };

                        favoris.push(newFavoris);

                        localStorage.setItem(Liste, JSON.stringify(favoris));
                        alert('lieu ajouté aux favoris !');

                    }
                }
            }
        }
    })
