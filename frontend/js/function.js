//Fonction permettant d'afficher les produits dans le HTML || Page Accueil
function displayProducts(products) {
    products.forEach(function(produit) {
        //On crée les éléments HTML
        let container = document.getElementById('container')
        let carte = document.createElement("div")
        let bottomCarte = document.createElement("div")
        let texteDiv = document.createElement("div")
        let image = document.createElement("img")
        let titre = document.createElement("h3")
        let description = document.createElement("p")
        let prix = document.createElement("h4")
        let btn = document.createElement("a")

        //On structure les éléments dans le HTML
        container.appendChild(carte)
        carte.appendChild(image)
        carte.appendChild(texteDiv)
        texteDiv.appendChild(titre)
        texteDiv.appendChild(description)
        texteDiv.appendChild(bottomCarte)
        bottomCarte.appendChild(prix)
        bottomCarte.appendChild(btn)

        //On donne des attributs à nos éléments (une classe par exemple)
        carte.setAttribute('class', 'carte')
        image.setAttribute('class', 'image')
        texteDiv.setAttribute('class', 'content')
        titre.setAttribute('class', 'titre')
        description.setAttribute('class', 'description')
        bottomCarte.setAttribute('class', 'bottom-carte')
        prix.setAttribute('class', 'prix')
        btn.setAttribute('button', 'click')
        btn.setAttribute('class', 'btn')

        /*
         * On rend notre HTML dynamique, il récupère donc les informations des produits
         * depuis l'API pour les afficher ensuite
         */
        titre.textContent = produit.name;
        description.textContent = produit.description;
        prix.textContent = "Prix: " + produit.price + " €";
        image.src = produit.imageUrl;
        btn.textContent = "Voir produit"

        /*
         * On dit au bouton "Voir produit" qu'il doit rediriger vers la
         * page produit du produit séléctionné grâce à son ID
         */
        btn.addEventListener('click', function() {
            btn.href = 'pages/produit.html?id=' + produit._id
        })
    })
}


//////////////////////////////////////////////////////////



//Fonction permettant d'afficher les produits dans le HTML || Page Produit
function displayProduct(products) {
    products.forEach(function(produit) {
        //On récupère les éléments HTML grâce à leur ID
        let image = document.getElementById("image")
        let titre = document.getElementById("titre")
        let description = document.getElementById("description")
        let prix = document.getElementById("prix")
        let btn = document.getElementById("btn-panier")
        let select = document.getElementById("select_color")
        let quantity = document.getElementById("product-quantity")

        /*
         * On rend notre HTML dynamique, il récupère donc les informations des produits
         * depuis l'API pour les afficher ensuite
         */
        titre.textContent = produit.name;
        description.textContent = produit.description;

        //Récupérer les couleurs et les mettre dans une liste déroulante
        for (var c = 0; c < produit.colors.length; c++) {
            var select_option = document.createElement("option")
            select_option.text = produit.colors[c]
            select_option.value = produit.colors[c]
            select.add(select_option)
        }

        //Choisir la quantité de produit possible
        for (var q = 0; q < 5; q++) {
            var select_option = document.createElement("option")
            select_option.text = q + 1
            select_option.value = q + 1
            quantity.add(select_option)
        }


        //Affichage du prix et de l'image ainsi que du bouton d'ajout au panier
        prix.textContent = "Prix: " + produit.price + " €";
        image.src = produit.imageUrl;
        image.alt = "Image du produit " + produit.name
        btn.textContent = "Ajouter au panier"



        //---------------- Gestion du panier ----------------//
        //La récupération des données sélectionnées par l'utilisateur et envoie du panier

        //Sélection de l'id du formulaire des couleurs
        const idForm = document.querySelector("#select_color")

        //Sélection de l'id du formulaire des quantités
        const idFormQuantity = document.querySelector("#product-quantity")

        //Envoyer le panier
        btn.addEventListener('click', (e) => {
            e.preventDefault()

            //Mettre la couleur que l'utilisateur a choisi dans une variable
            const choiceColor = idForm.value

            //Mettre la quantité que l'utilisateur a choisie dans une variable
            const choiceQuantity = idFormQuantity.value

            //Récupération des valeurs du formulaire
            let optionProduct = {
                id_Product: produit._id,
                nameProduct: produit.name,
                select_color: choiceColor,
                quantite: choiceQuantity,
                prix: produit.price * choiceQuantity
            }


            //------------------ Le Local Storage ------------------//
            //Stocker la récupération des valeurs du formulaire dans le local storage

            //Déclaration de la variable "products" dans laquelle nous mettons les keys et les values qui sont dans le local storage
            let products = JSON.parse(localStorage.getItem("produit"))
                //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

            //Fonction qui permet d'ajouter un produit sélectionné dans le localStorage
            const ajoutProduitLocalStorage = () => {
                //Ajout dans le tableau de l'objet avec les values choisis par l'utilisateur
                products.push(optionProduct)

                //Transformation en format JSON et l'envoyer dans la key "produit" du localStorage
                localStorage.setItem("produit", JSON.stringify(products))
            }

            //Fonction fenêtre pop up
            const popupConfirmation = () => {
                if (window.confirm(`Vous avez bien ajouté ${produit.name} avec la couleur ${choiceColor} dans votre panier !

Consulter le panier : OK
Revenir à l'accueil : ANNULER`)) {
                    window.location.href = "../pages/panier.html"
                } else {
                    window.location.href = "../index.html"
                }
            }

            //S'il y'a déjà des produits enregistrés dans le localStorage
            if (products) {
                ajoutProduitLocalStorage()
                popupConfirmation()
            }
            //S'il n'y a pas de produit d'enregistré dans le localStorage
            else {
                products = []
                ajoutProduitLocalStorage()
                popupConfirmation()
            }
        })
    })
}