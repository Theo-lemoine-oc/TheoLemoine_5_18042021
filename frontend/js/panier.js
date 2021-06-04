//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle nous mettons les keys et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
    //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript


//----------------- L'affichage des produits du panier -----------------//
//Sélection de la classe où je vais injecter le code HTML
const containerBasket = document.querySelector("#container")

//Si le panier est vide : afficher le panier est vide
if (produitEnregistreDansLocalStorage === null) {
    const emptyBasket = `
    <div class="container-empty-basket">
        <p>Votre panier est vide</p>
    </div>
    `
    containerBasket.innerHTML = emptyBasket

} else {

}