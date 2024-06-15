import { renderOrderSummary } from "../../Scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, updateDeliveryOption } from "../../data/cart.js";

describe('Test suite: renderOrderSummary', () => {
  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productname1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";
  const productname2 = "Intermediate Size Basketball";
  const priceCents1 = 10.90;
  const priceCents2 = 20.95;

  beforeEach(() => {
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container')
      .innerHTML = 
      `
        <div class="js-checkout-header"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
      `;

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: product2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container')
      .innerHTML = ``;
  })

  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${product1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${product1}`).innerText
    ).toContain(productname1);

    expect(
      document.querySelector(`.js-product-name-${product2}`).innerText
    ).toContain(productname2);

    expect(
      document.querySelector(`.js-product-price-${product1}`).innerText
    ).toContain(`$${priceCents1}`);

    expect(
      document.querySelector(`.js-product-price-${product2}`).innerText
    ).toContain(`$${priceCents2}`);
  });

  it('Removes a product', () => {
    document.querySelector(`.js-delete-link-${product1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${product1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${product2}`)
    ).not.toEqual(null);

    expect(
      document.querySelector(`.js-product-name-${product2}`).innerText
    ).toContain(productname2);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);
    expect(
      document.querySelector(`.js-product-price-${product2}`).innerText
    ).toContain(`$${priceCents2}`);
  });

  it('updates delivery option', () => {
    document.querySelector(`.js-delivery-option-${product1}-3`).click();
    expect(
      document.querySelector(`.js-delivery-option-input-${product1}-3`).checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0]).toEqual(
      {
        productId: product1,
        quantity: 2,
        deliveryOptionId: '3'
      }
    );

    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual(`$14.98`);
    expect(
      document.querySelector('.js-total-price').innerText
    ).toEqual(`$63.50`);
  });
});