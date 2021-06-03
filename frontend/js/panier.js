//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle nous mettons les keys et les values qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"))
    //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript


console.log(produitEnregistreDansLocalStorage)