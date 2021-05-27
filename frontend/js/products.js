//On récupère la chaine de requête dans l'URL
const queryString_url_id = window.location.search

//Méthode pour extraire seulement l'ID
const searchId = new URLSearchParams(queryString_url_id)

const productId = searchId.get("id")

//Affichage du produit selon son ID
let response = fetch(`http://localhost:3000/api/teddies/${productId}`)