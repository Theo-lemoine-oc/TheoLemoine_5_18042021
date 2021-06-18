//Récupérer l'ID de la commande dans le localStorage (via le serveur)
const responseId = localStorage.getItem("responseId")

//Prendre la key dans le localStorage et la mettre dans une variable
const Formulaire = localStorage.getItem("contact")

//Convertir la chaine de caractères en objet javascript
const formulaireContent = JSON.parse(Formulaire)

//Prendre la key dans le localStorage et la mettre dans une variable
const totalPriceAfficher = localStorage.getItem("totalPrice")

//Convertir la chaine de caractères en objet javascript
const totalPriceAfficher1 = JSON.parse(totalPriceAfficher)


//---------- La structure HTML de la page confirmation.html ----------//
//Sélection de l'élément du DOM pour le positionnement
const container = document.querySelector("#recapitulation")

const structureConfirmationCommande = `
    <h3>Numéro de votre commande : <span>${responseId}</span></h3>
    <p>Récapitulatif des informations de livraison :</p>
    <ul>
        <li>${formulaireContent.firstName} ${formulaireContent.lastName}</li>
        <li>${formulaireContent.address}, ${formulaireContent.city}</li>
        <li>${formulaireContent.email}</li>
    </ul>
    <p>Le prix total est de <span>${totalPriceAfficher1}</span> €</p>
    <p>Au plasir de vous revoir !</p>
`

//Injection de l'HTML dans la page
container.insertAdjacentHTML("afterbegin", structureConfirmationCommande)


//Effacer tout le localStorage sauf le formulaire
function enleverCleLocalStorage(key) {
    localStorage.removeItem(key)
}

enleverCleLocalStorage("produit")
enleverCleLocalStorage("responseId")