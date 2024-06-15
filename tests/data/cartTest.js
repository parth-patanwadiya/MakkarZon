import { addToCart,removeFromCart, cart, loadFromStorage } from '../../data/cart.js';

describe('Test suite: addToCart', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }
      ]
    ));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
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
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: product1,
        quantity: 3,
        deliveryOptionId: '1'
      },
      {
        productId: product2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
  });

  it('Remove a product that is in the cart', () => {
    removeFromCart(product1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
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
    removeFromCart(productNotInTheCart);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
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