import {Product, Clothing, Appliance } from '../../data/products.js';

describe('Test suite: products', ()=>{

  describe('Product class', ()=>{
    let product;
    beforeEach(()=>{
      product = new Product( {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
      });
    });

    it('generates object and has the correct properties', ()=>{
      expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    });
    it('gets the stars URL', ()=>{
      expect(product.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
    });
  });


  describe('Clothing class', ()=>{
    let product;
    beforeEach(()=>{
      product = new Clothing( {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      });
    });

    it('generates object and has the correct properties', ()=>{
      expect(product.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    });

    it('gets the price', ()=>{
      expect(product.getPrice()).toEqual('$7.99');
    });
  });

  describe('Applicance class', ()=>{
    let product;
    beforeEach(()=>{
      product = new Appliance( {
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ],
        type: "appliance",
        instructionLink:"images/appliance-instructions.png",
        warrantyLink: "images/appliance-warranty.png"
      });
    });

    it('generates object and has the correct properties', ()=>{
      expect(product.name).toEqual('2 Slot Toaster - Black');
    });

    it('adds the instructions and warranty link', ()=>{
      expect(product.extraInfoHTML()).toContain(
        `<a href="images/appliance-instructions.png" target="_blank">`
      );
    });
  });
});