
var x = getTotalPrice();
 document.getElementById("finalPrice").innerHTML = "Total price :     "+ x + "€"; //init panier 
 var y = getNumberProduct();
 document.getElementById("finalNumber").innerHTML = "Total products :     " + y + "items";//init total panier
 




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

    // Convert the productId to a string before searching or undefined
    let foundProduct = basket.find(p => p.id === productId.toString());

    if (foundProduct) {
        if (foundProduct.quantity > 0) {
            foundProduct.quantity--;
            saveBasket(basket);
            updateCartDisplay();
            console.log('Product removed successfully');
        }
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
    document.getElementById("finalPrice").innerHTML = "Total price :     " + totalPrice + "€";

    var totalProducts = getNumberProduct();
    document.getElementById("finalNumber").innerHTML = "Total products :     " + totalProducts + "items";

    var basket = getBasket();
    for (var i = 0; i < basket.length; i++) {
        var productQuantity = basket[i].quantity;
        document.getElementById("productQuantity_" + i).innerHTML = "Product " + i + " quantity :     " + productQuantity;
    }
}
