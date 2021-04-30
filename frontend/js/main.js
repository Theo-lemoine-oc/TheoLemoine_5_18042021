(async function() {
    const products = await getProducts()
    console.log(products)
    displayProducts(products)
})()

function getProducts() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products) {
            return products
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayProducts() {
    return ""
}