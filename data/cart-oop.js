import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
  
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 3,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
  
    calculateCartQuantity(){
      let cartQuantity = 0;
    
      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
    addToCart(productId){
      let matchingItem;
    
      // const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
    
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
    
      if(matchingItem){
        matchingItem.quantity += 1;
      }
      else{
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
    
      this.saveToStorage();
    },
  
    removeFromCart(productId){
      const newCart = [];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
    updateQuantity(productId, newQuantity){
      let matchingProduct;
    
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingProduct = cartItem;
        }
      });
      matchingProduct.quantity = newQuantity;
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      
      if(!validDeliveryOption(deliveryOptionId)){
        return;
      }
    
      this.cartItems.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
    
      if(!matchingItem){
        return;
      }
    
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);