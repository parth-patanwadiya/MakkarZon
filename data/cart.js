export const cart = [];

export function addToCart(productId){
  let matchingItem;

  const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += Number(quantity);
  }
  else{
    cart.push({
      productId,
      quantity: Number(quantity)
    });
  }
}