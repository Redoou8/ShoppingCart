
var x = getTotalPrice();
 document.getElementById("finalPrice").innerHTML = "Le prix total est de "+ x + "€"; //init panier 
 var y = getNumberProduct();
 document.getElementById("finalNumber").innerHTML = "Ce panier contient " + y + " produits";//init total panier
 
 for(i=0;i<3;i++){
    
    document.getElementById("affichagePanier").innerHTML = JSON.stringify(getBasket({id: i}));//init contenu panier
    
} 



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




function addBasket(product){ // ajout panier
    let basket = getBasket(); 
    let foundProduct = basket.find(p => p.id == product.id) // recherche si produit est deja present dans le panier
    if (foundProduct != undefined){ // produit dejà dans le panier
        foundProduct.quantity++;
    } else{
        product.quantity = 1;
        basket.push(product); // ajout dans tableau 
    }
     saveBasket(basket); // sauvegarde dans localstorage
     
     var x = getTotalPrice();
    document.getElementById("finalPrice").innerHTML = "Le prix total est de "+ x + "€";

    var y = getNumberProduct();
    document.getElementById("finalNumber").innerHTML = "Ce panier contient " + y + " produits";
    
    for(i=0;i<3;i++){
       
        document.getElementById("affichagePanier").innerHTML = JSON.stringify(getBasket({id: i}));
       

    }
    
}

function resetAll() {
   localStorage.clear();
   window.location.reload();
}




function removeFromBasket(product){  // retrait panier
    let basket = getBasket(); // que veut-on retirer ?
    basket = basket.filter(p => p.id != product.id); // != : on garde tout ce qui est différent de cet item id
    saveBasket(basket); 
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
    
}}}

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

getQuantity(id){

    


}