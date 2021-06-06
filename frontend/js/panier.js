//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle nous mettons les keys et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
    //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript


//----------------- L'affichage des produits du panier -----------------//
//Sélection de la classe où je vais injecter le code HTML
const containerBasket = document.querySelector("#container")

//Si le panier est vide : il faut afficher le panier est vide
if (produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0) {
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
            <p>${produitEnregistreDansLocalStorage[b].prix} € <button class="product-delete"><i class="fas fa-trash-alt text-danger"></i></button</p>
        </div>
        `
    }
    if (b == produitEnregistreDansLocalStorage.length) {
        //Injection du HTML dans la page panier
        containerBasket.innerHTML = basketStructure
    }

    //Ajout du titre de la page des paniers indiquant le nombre de produits dans le panier
    basketTitle = document.getElementById("basket-title")
    basketTitle.textContent = "Les produits que vous avez sélectionnez (" + produitEnregistreDansLocalStorage.length + ") :"
}



//------------- Gestion du boutton : Supprimer l'article ------------//
//Sélection des références de tous les boutons product-delete
let btnDelete = document.querySelectorAll(".product-delete")

for (let d = 0; d < btnDelete.length; d++) {
    btnDelete[d].addEventListener('click', (e) => {
        e.preventDefault()

        //Sélection de l'ID du produit qui sera supprimé à chaque fois qu'un utilisateur appuie sur l'icone supprimer
        let idDelete = produitEnregistreDansLocalStorage[d].id_Product

        //Méthode filter pour sélectionner les éléments à garder et supprimer l'élément où le btn delete a été cliqué
        produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter(el => el.id_Product != idDelete)

        //Envoie de la variable dans le localStorage  
        //Transformation en format JSON et l'envoyer dans la key "produit" du localStorage
        localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage))

        //Alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Ce produit a bien été supprimé du panier !")
        window.location.href = "../pages/panier.html"
    })
}



//---------------- Bouton pour vider entièrement le panier ----------------//
//Le code HTML du bouton à afficher dans la page
const btnDeleteAll = `
    <div class="total-amount d-flex justify-content-center">
        <p></p>
        <button class="product-delete-all">Vider le panier</button>
    </div>
`

//Insertion du bouton dans le HTML du panier
containerBasket.insertAdjacentHTML("beforeend", btnDeleteAll)

//Sélection de la référence du bouton "product-delete-all"
const productDeleteAll = document.querySelector(".product-delete-all")

//Suppression de la key "produit" du localStorage pour vider entièrement le panier
productDeleteAll.addEventListener('click', (e) => {
    e.preventDefault()

    //Si le panier possède un ou plusieurs produits : On le vide quand l'utilisateur clique sur le bouton pour le vider
    if (produitEnregistreDansLocalStorage) {
        //.removeItem pour vider le localStorage
        localStorage.removeItem("produit")

        //Alert "Le panier a été vidé !"
        alert("Le panier a été vidé !")

        //Rechargement de la page panier
        window.location.href = "../pages/panier.html"

    }
    //Si le panier est déjà vide, on prévient l'utilisateur qu'il ne peut pas le vider
    else {
        alert("Votre panier est déjà vide !")
    }
})



//---------------- Calcule du montant total du panier ----------------//
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let totalPriceCalcul = []

//Aller chercher les prix dans le panier
for (let t = 0; t < produitEnregistreDansLocalStorage.length; t++) {
    let totalPriceBasket = produitEnregistreDansLocalStorage[t].prix

    //Mettre les prix du panier dans la variable "totalPriceCalcul"
    totalPriceCalcul.push(totalPriceBasket)
}

//Additionner les prix qu'il y a dans le tableau de la variable "totalPriceCalcul" avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue
const totalPrice = totalPriceCalcul.reduce(reducer, 0)

//Sélection de la classe où je vais injecter le code HTML du prix total
const totalAmount = document.querySelector(".total-amount p")

//Le code HTML du prix total à afficher et injection
totalAmount.textContent = "Montant total : " + totalPrice + " €";