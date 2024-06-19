import { cart } from '../../data/cart-class.js';

describe('Test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(
      [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }
      ]
    ));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {;

    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(
      [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]
    ));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe('Test suite: removeFromCart', () => {
  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productNotInTheCart = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    
    cart.cartItems = [{
      productId: product1,
      quantity: 3,
      deliveryOptionId: '1'
    },
    {
      productId: product2,
      quantity: 1,
      deliveryOptionId: '2'
    }];
  });

  it('Remove a product that is in the cart', () => {
    cart.removeFromCart(product1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(
      [
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]
    ));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

  it('Remove a product that is NOT in the cart', () => {
    cart.removeFromCart(productNotInTheCart);
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(
      [
        {
          productId: product1,
          quantity: 3,
          deliveryOptionId: '1'
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]
    ));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });
});

describe('Test suite: updateDeliveryOption', () => {

  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(()=>{
    spyOn(localStorage, 'setItem');

    cart.cartItems = [{
      productId: product1,
      quantity: 3,
      deliveryOptionId: '1'
    }];
  });

  it('tests update delivery option with the product in the cart', ()=>{
    cart.updateDeliveryOption(product1, '3');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(
      [
        {
          productId: product1,
          quantity: 3,
          deliveryOptionId: '3'
        }
      ]
    ));
  });

  it('does nothing if the product NOT in the cart', ()=>{
    cart.updateDeliveryOption('product-does-not-exits', '3');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the deliveryOptionId is NOT valid', ()=>{
    cart.updateDeliveryOption(product1, '5');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

});