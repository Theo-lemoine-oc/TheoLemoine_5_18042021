//Fonction principale récupère et affiche les produits sur la page
(async function() {
    const products = await getProducts()
    displayProducts(products)
})()

//Fonction qui permet de récupérer les produits dans l'API
function getProducts() {
    //On saisit l'URL de l'API, on utilise fetch
    return fetch("http://localhost:3000/api/teddies")
        //Les promesses
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products) {
            return products
        })
        // En cas d'erreur
        .catch(function(error) {
            alert(error)
        })
}