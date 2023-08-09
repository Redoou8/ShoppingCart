
var x = getTotalPrice();
 document.getElementById("finalPrice").innerHTML = "Le prix total est de "+ x + "€"; //init panier 
 var y = getNumberProduct();
 document.getElementById("finalNumber").innerHTML = "Ce panier contient " + y + " produits";//init total panier
 




//GERER LOCALSTORAGE

function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket)); //sauvegarde en transformant en charactères (compatibilité)
}


function getBasket(){   // recherche item dans le localstorage
    let basket = localStorage.getItem("basket");  
    if(basket == null){ 
        return [];  // n'existe pas donc retourner un tableau nul sinon erreur

    }
    else{
        return JSON.parse(basket); // transformation en objet
    }
    
}




function addBasket(product){
    let basket = getBasket(); 
    let foundProduct = basket.find(p => p.id === product.id);
    if (foundProduct !== undefined){
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        basket.push(product);
    }
    saveBasket(basket);
    updateCartDisplay();
}

function removeOneFromBasket(productId) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id === productId);

    if (foundProduct) {
        if (foundProduct.quantity > 0) {
            foundProduct.quantity--;
        } 

       
        updateCartDisplay();
    }
}

function resetAll() {
   localStorage.clear();
   window.location.reload();
}


function quantityChange(product,quantity){ // changer quantité
    let basket = getBasket(); 
    let foundProduct = basket.find(p => p.id == product.id)
    if (foundProduct != undefined){ 
        foundProduct.quantity+= quantity;
        if(foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
             saveBasket(basket);
    
}}
updateCartDisplay();}

function getNumberProduct() {       //total des produits du panier
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }

    return number;
}

function getTotalPrice() { // Cout total

    let basket = getBasket();
    let Tprice = 0;
    for (let product of basket) {
        Tprice += product.quantity * product.price;
    }

    return Tprice;

}

function findObject(item) {
   return item.id;

}

function updateCartDisplay() {
    var totalPrice = getTotalPrice();
    document.getElementById("finalPrice").innerHTML = "Le prix total est de " + totalPrice + "€";

    var totalProducts = getNumberProduct();
    document.getElementById("finalNumber").innerHTML = "Ce panier contient " + totalProducts + " produits";

    var basket = getBasket();
    for (var i = 0; i < basket.length; i++) {
        var productQuantity = basket[i].quantity;
        document.getElementById("productQuantity_" + i).innerHTML = "Quantité du produit " + i + ": " + productQuantity;
    }
}
