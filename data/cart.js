import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [
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
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function addToCart(productId){
  let matchingItem;

  // const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  }
  else{
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  let matchingProduct;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingProduct = cartItem;
    }
  });
  matchingProduct.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  
  if(!validDeliveryOption(deliveryOptionId)){
    return;
  }

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(!matchingItem){
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}