// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  let storage = window.localStorage;

  if(storage.getItem("store") == null){
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data =>{
      storage.setItem("store", JSON.stringify(data));
      createList();
    });
  }
  else{
    createList();
  }

  function createList(){
    let cartCount = document.getElementById("cart-count");
    let storage = window.localStorage;
    let cart = storage.getItem("cart");

    if(!cart){
      cart = {};
    }

    else{
      cart = JSON.parse(cart);
    }
    cartCount.innerText = Object.keys(cart).length.toString();

    let items = JSON.parse(storage.getItem("store"));
    for(let i = 0; i < items.length; i++){
        let currentItem = items[i];
        let test = document.createElement("product-item");
        const shadow = test.shadowRoot;
        let buttonLabel;
        if("item-" + currentItem.id in cart){
          buttonLabel = "Remove From Cart";
        }

        else{
          buttonLabel = "Add To Cart";
        }

        shadow.querySelector('.price').textContent = "$" + currentItem.price;
        shadow.querySelector('.title').textContent = currentItem.title;
        shadow.querySelector('img').src = currentItem.image;
        shadow.querySelector('img').alt = currentItem.title;
        shadow.querySelector('li').dataset.id = currentItem.id; 
        shadow.querySelector('button').innerText = buttonLabel;

        document.getElementById('product-list').appendChild(test);
        
    }
  }
  
  // 

});

