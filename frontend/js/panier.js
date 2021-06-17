//Déclaration de la variable "products" dans laquelle nous mettons les keys et les values qui sont dans le local storage
let products = JSON.parse(localStorage.getItem("produit"))
    //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript


//----------------- L'affichage des produits du panier -----------------//
//Sélection de la classe où je vais injecter le code HTML
const containerBasket = document.querySelector("#container")

//Si le panier est vide : il faut afficher le panier est vide
if (products === null || products == 0) {
    const emptyBasket = `
    <div class="container-empty-basket">
        <p>Votre panier est vide</p>
    </div>
    `
    containerBasket.innerHTML = emptyBasket

} else {
    //Si le panier n'est pas vide : il faut afficher les produits dans le localStorage
    let basketStructure = []

    for (b = 0; b < products.length; b++) {
        basketStructure = basketStructure + `
        <div class="content d-flex justify-content-between">
            <p>${products[b].nameProduct} (${products[b].quantite}) | Couleur : ${products[b].select_color}</p>
            <p class="product-right">${products[b].prix} € <button class="product-delete"><i class="fas fa-trash-alt text-danger"></i></button</p>
        </div>
        `
    }
    if (b == products.length) {
        //Injection du HTML dans la page panier
        containerBasket.innerHTML = basketStructure
    }

    //Ajout du titre de la page des paniers indiquant le nombre de produits dans le panier
    basketTitle = document.getElementById("basket-title")
    basketTitle.textContent = "Les produits que vous avez sélectionnez (" + products.length + ") :"
}



//------------- Gestion du boutton : Supprimer l'article ------------//
//Sélection des références de tous les boutons product-delete
let btnDelete = document.querySelectorAll(".product-delete")

for (let d = 0; d < btnDelete.length; d++) {
    btnDelete[d].addEventListener('click', (e) => {
        e.preventDefault()

        //Sélection de l'ID du produit qui sera supprimé à chaque fois qu'un utilisateur appuie sur l'icone supprimer
        let idDelete = products[d].id_Product

        //Méthode filter pour sélectionner les éléments à garder et supprimer l'élément où le btn delete a été cliqué
        products = products.filter(el => el.id_Product != idDelete)

        //S'il y a qu'un produit dans le panier, ça vide directement le panier, s'il y en a plus, ça supprime le produit sélectionné et non le sautres
        if (products.length < 1) {
            //Vider le panier
            localStorage.removeItem("produit")
        } else {
            //Envoie de la variable dans le localStorage  
            //Transformation en format JSON et l'envoyer dans la key "produit" du localStorage
            localStorage.setItem("produit", JSON.stringify(products))
        }

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
    if (products) {
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
for (let t = 0; t < products.length; t++) {
    let totalPriceBasket = products[t].prix

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





//---------------- Formulaire de confirmation de paiement ----------------//
const afficherFormulaireHtml = () => {
    const structureFormulaire = `
        <secton class="form">
            <div class="form-command">
                <h2>Remplissez le formulaire pour valider la commande</h2>

                <form>
                    <label for="firstName" class="d-flex flex-column">Prénom</label>
                    <input type="text" id="firstName" name="firstName" required>
                    <span id="prenomManquant" class="wrong-value text-danger"></span>

                    <label for="lastName" class="d-flex flex-column">Nom</label>
                    <input type="text" id="lastName" name="lastName" required>
                    <span id="nomManquant" class="wrong-value text-danger"></span>

                    <label for="address" class="d-flex flex-column">Adresse</label>
                    <input type="text" id="address" name="address" required>
                    <span id="adresseManquant" class="wrong-value text-danger"></span>

                    <label for="city" class="d-flex flex-column">Ville</label>
                    <input type="text" id="city" name="city" required>
                    <span id="villeManquant" class="wrong-value text-danger"></span>

                    <label for="email" class="d-flex flex-column">E-mail</label>
                    <input type="text" id="email" name="email" required>
                    <span id="emailManquant" class="wrong-value text-danger"></span>

                    <button id="sendForm" type="submit" name="sendForm" class="d-flex flex-column">
                        Confirmation de la commande
                    </button>
                </form>
            </div>
        </secton>
    `

    //Injection de l'HTML dans la page panier
    containerBasket.insertAdjacentHTML("afterend", structureFormulaire)
}

//Affichage du formulaire
afficherFormulaireHtml()

//Sélection du bouton Envoyer le formulaire
const btnEnvoyerFormulaire = document.querySelector("#sendForm")

//AddEventListener
btnEnvoyerFormulaire.addEventListener('click', (e) => {
    e.preventDefault()

    //Création d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
    class Formulaire {
        constructor() {
            this.firstName = document.querySelector("#firstName").value
            this.lastName = document.querySelector("#lastName").value
            this.address = document.querySelector("#address").value
            this.city = document.querySelector("#city").value
            this.email = document.querySelector("#email").value
        }
    }

    //Appel de l'instance de la classe Formulaire pour créer l'objet contact
    const contact = new Formulaire()


    //---------------- Gestion de la validation du formulaire ----------------//
    //Message d'erreur en cas de non validité
    const errorAlert = (value) => {
        return `${value} n'est pas bien saisi !\n\nLes chiffres et les symboles ne sont pas autorisés !\nLe prénom doit faire entre 3 et 40 caractères"`
    }

    //Regex pour controler le prénom, le nom et la ville
    const regExPrenomNonVille = (value) => {
        return /^([A-Za-zéèöô]{3,40}?([-]{0,1}))?([A-Za-zéèöô]{3,40})$/.test(value)
    }

    //Regex pour controler l'adresse E-mail
    const regExEmail = (value) => {
        return /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/.test(value)
    }

    //Regex pour controler l'adresse
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s-éè]{5,50}$/.test(value)
    }

    //Fonction qui affiche un message d'erreur sous le champ ayant un problème (version vide)
    const dataChampManquantTextVide = (querySelectorId) => {
        //Ajout du message d'erreur sur la champ ayant une erreur
        document.querySelector(`#${querySelectorId}`).textContent = ""
    }

    //Fonction qui affiche un message d'erreur sous le champ ayant un problème (version pleine)
    const dataChampManquant = (querySelectorId) => {
        //Ajout du message d'erreur sur la champ ayant une erreur
        document.querySelector(`#${querySelectorId}`).textContent = "Veuillez bien remplir ce champ"
    }

    ///////////////////////

    //Contrôle de la validité du prénom avec REGEX
    function prenomControle() {
        const lePrenom = contact.firstName
        if (regExPrenomNonVille(lePrenom)) {
            dataChampManquantTextVide("prenomManquant")
            return true
        } else {
            dataChampManquant("prenomManquant")
            alert(errorAlert("Prénom"))
            return false
        }
    }

    //Contrôle de la validité du nom avec REGEX
    function nomControle() {
        //Contrôle de la validité du nom avec REGEX
        const leNom = contact.lastName
        if (regExPrenomNonVille(leNom)) {
            dataChampManquantTextVide("nomManquant")
            return true
        } else {
            dataChampManquant("nomManquant")
            alert(errorAlert("Nom"))
            return false
        }
    }

    //Contrôle de la validité de l'adresse avec REGEX
    function adresseControle() {
        const leAdresse = contact.address
        if (regExAdresse(leAdresse)) {
            dataChampManquantTextVide("adresseManquant")
            return true
        } else {
            dataChampManquant("adresseManquant")
            alert("L'adresse doit contenir que des lettres sans ponctuations et des chiffres !")
            return false
        }
    }

    //Contrôle de la validité de la ville avec REGEX
    function villeControle() {
        //Contrôle de la validité du nom avec REGEX
        const laVille = contact.city
        if (regExPrenomNonVille(laVille)) {
            dataChampManquantTextVide("villeManquant")
            return true
        } else {
            dataChampManquant("villeManquant")
            alert(errorAlert("Ville"))
            return false
        }
    }


    //Contrôle de la validité du mail avec REGEX
    function emailControle() {
        const leEmail = contact.email
        if (regExEmail(leEmail)) {
            dataChampManquantTextVide("emailManquant")
            return true
        } else {
            dataChampManquant("emailManquant")
            alert("L'email n'est pas valide !")
            return false
        }
    }

    //Si le champ est valide selon le Regex : On envoie dans le localStorage
    if (prenomControle() && nomControle() && adresseControle() && villeControle() && emailControle()) {
        //Mettre l'objet "contact" dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact))


        //--------------- Fin de la gestion de la validation du formulaire ---------------//

        //Récupérer l'ID de tous les produits
        const map = products.map(p => p.id_Product)

        //Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
        const aEnvoyer = {
            products: map,
            contact,
        }

        //Envoie de l'objet "aEnvoyer" vers le serveur
        const promise01 = fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aEnvoyer)
        })

        //Voir le résultat du serveur dans la console
        promise01.then(async(response) => {
            try {
                const contenu = await response.json()

                if (response.ok) {
                    //Mettre l'ID de la commande que le serveur nous a retourné dans le localStorage
                    localStorage.setItem("responseId", contenu.orderId)

                    //Rediriger l'utilisateur vers la page de confirmation
                    window.location = "../pages/confirmation.html"
                } else {
                    console.log(response.status)
                }
            } catch (e) {
                alert(`Erreur qui vient du catch() ! -> ${e}`)
            }
        })
    }
    //Sinon on envoie pas et informe l'utilisateur
    else {
        alert("Veuillez bien remplir le formulaire !")
    }
})

//---------------- Mettre le contenu du localStorage dans les champs du formulaire ----------------//
//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("contact")

//Convertir la chaine de caractères en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage)

//Fonction pour que le champ du formulaire soit rempli par les données du localStorage si elle existe
function remplirChampInputDepuisLocalStorage(input) {
    if (dataLocalStorageObjet == null) {

    } else {
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[input]
    }
}

remplirChampInputDepuisLocalStorage("firstName")
remplirChampInputDepuisLocalStorage("lastName")
remplirChampInputDepuisLocalStorage("address")
remplirChampInputDepuisLocalStorage("city")
remplirChampInputDepuisLocalStorage("email")