//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle nous mettons les keys et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
    //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript


//----------------- L'affichage des produits du panier -----------------//
//Sélection de la classe où je vais injecter le code HTML
const containerBasket = document.querySelector("#container")

//Si le panier est vide : il faut afficher le panier est vide
if (produitEnregistreDansLocalStorage === null) {
    const emptyBasket = `
    <div class="container-empty-basket">
        <p>Votre panier est vide</p>
    </div>
    `
    containerBasket.innerHTML = emptyBasket

} else {
    //Si le panier n'est pas vide : il faut afficher les produits dans le localStorage
    let basketStructure = []

    for (b = 0; b < produitEnregistreDansLocalStorage.length; b++) {
        basketStructure = basketStructure + `
        <div class="content d-flex justify-content-between">
            <p>${produitEnregistreDansLocalStorage[b].nameProduct} (1) | Couleur : ${produitEnregistreDansLocalStorage[b].select_color}</p>
            <p>${produitEnregistreDansLocalStorage[b].prix} <a href="#"><i class="fas fa-trash-alt text-danger"></i></a></p>
        </div>
        `
    }
    if (b == produitEnregistreDansLocalStorage.length) {
        //Injection du HTML dans la page panier
        containerBasket.innerHTML = basketStructure
    }
}