// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  storage = window.localStorage

  if(storage.getItem("store") == null){
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => storage.setItem("store", JSON.stringify(data)));
  }


  let items = JSON.parse(storage.getItem("store"));
  for(let i = 0; i < items.length; i++){
      let currentItem = items[i];
      let test = document.createElement("product-item");
      const shadow = test.shadowRoot;

      shadow.querySelector('.price').textContent = "$" + currentItem.price;
      shadow.querySelector('.title').textContent = currentItem.title;
      shadow.querySelector('img').src = currentItem.image;
      shadow.querySelector('img').alt = currentItem.title;

      document.getElementById('product-list').appendChild(test);
      
  }
  // added to the cart 
  
  // remove from the cart 

});

