let affichagep2 = document.querySelector(".addFav")
let save = JSON.parse(localStorage.getItem('favoris'));
 
function P2() {
 
    for (i = 0; i < save.length; i++) {



        affichagep2.innerHTML += `
    <div class="onClick">
        <div class="imgdescription">   
        <img src="./assets/img/restaurant-photo.webp" alt="Photos de restaurant" class="imgDes">
        </div>
        <div class="titreAdresses"><h1>${save[i].titre}</h1>
        <p class="adresseDescription">${save[i].contact}</p>  
        <p class="adresseDescription">${save[i].infos}</p>        
        </div>
        <div class="btndescription">
        <button class="btnSupp">X</button>
        </div> 
    </div> `;
    }
}

P2();

affichagep2.onclick = (event) => {
    let target = event.target;
    if (target.className == "btnSupp") {
        target.parentElement.parentElement.remove();
        localStorage.clear()
    }
}


