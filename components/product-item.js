// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(){

    super();

    let style = document.createElement('style');
    let shadow = this.attachShadow({mode: 'open'})
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    let li = document.createElement("li");
    li.className = "product";

    let pic = document.createElement("img");

    let p = document.createElement("p");
    p.className = "title";
    p.textContent = "default Title"

    let cost = document.createElement("p");
    cost.className = "price";
    cost.textContent = "default";

    let clickButton = document.createElement("button");
    clickButton.onclick = function(e){
      let storage = window.localStorage;
      console.log("item id:", li.dataset.id);
      let cart = JSON.parse(storage.getItem("cart"));

      if(!cart){
        cart = {};
      }
     
      let cartCount = document.getElementById("cart-count");
        if (clickButton.textContent == "Add To Cart"){
          clickButton.textContent = "Remove From Cart";
          cartCount.innerText = (Number(cartCount.innerText) + 1).toString(); 
          cart["item-" + li.dataset.id] = true;
          storage.setItem("cart", JSON.stringify(cart));
          alert("Item Added To Cart");
        }

        else{
          clickButton.textContent = "Add To Cart";
          cartCount.innerText = (Number(cartCount.innerText) - 1).toString(); 
          delete cart["item-" + li.dataset.id];
          storage.setItem("cart", JSON.stringify(cart));
          alert("Item Removed From Cart");
        }

    }

    shadow.appendChild(style);
    shadow.appendChild(li);
    li.appendChild(pic);
    li.appendChild(p);
    li.appendChild(cost);
    li.appendChild(clickButton);

  }
  
}
customElements.define('product-item', ProductItem);
