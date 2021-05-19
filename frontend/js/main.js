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

function displayProducts(products) {
    products.forEach(function(produit) {
        console.log(produit)
        let container = document.getElementById('container')
        let carte = document.createElement("div")
        let bottomCarte = document.createElement("div")
        let texteDiv = document.createElement("div")
        let image = document.createElement("img")
        let titre = document.createElement("h3")
        let description = document.createElement("p")
        let prix = document.createElement("h4")
        let btn = document.createElement("a")

        container.appendChild(carte)
        carte.appendChild(image)
        carte.appendChild(texteDiv)
        texteDiv.appendChild(titre)
        texteDiv.appendChild(description)
        texteDiv.appendChild(bottomCarte)
        bottomCarte.appendChild(prix)
        bottomCarte.appendChild(btn)


        carte.setAttribute('class', 'carte')
        image.setAttribute('class', 'image')
        texteDiv.setAttribute('class', 'content')
        titre.setAttribute('class', 'titre')
        description.setAttribute('class', 'description')
        bottomCarte.setAttribute('class', 'bottom-carte')
        prix.setAttribute('class', 'prix')
        btn.setAttribute('button', 'click')
        btn.setAttribute('class', 'btn')

        titre.textContent = produit.name;
        description.textContent = produit.description;
        prix.textContent = "Prix: " + produit.price + "€";
        image.src = produit.imageUrl;
        btn.textContent = "Voir produit"

        btn.addEventListener('click', function() {
            btn.href = 'produit.html?id=' + produit._id + '&api=' + produit.api

        })
    })
}



/* 
for (var i = 0; i < products.length; i++) {
        var prods = document.createElement('div')
        var title = document.createTextNode(products[i].name)
        prods.appendChild(title)
        var carts = document.getElementById('cards')
        cards.insertAdjacentHTML('afterbegin', prods)
    }
*/