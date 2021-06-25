//On récupère la chaine de requête dans l'URL
const queryString_url_id = window.location.search

/*
 *Méthode pour extraire seulement l'ID
 * Autre méthode (moins bonne) : utilisation du slice
 */
const searchId = new URLSearchParams(queryString_url_id)

const productId = searchId.get("id")

//Affichage du produit selon son ID
fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((httpBodyResponse) => {
        return httpBodyResponse.json()
    })
    .then((product) => {
        displayProduct([product])
    })
    // En cas d'erreur
    .catch((error) => {
        alert(error)
    })