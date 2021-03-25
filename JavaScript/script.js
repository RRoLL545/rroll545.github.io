let idInit = 0;


class Product {
  constructor(price) {
    idInit++;
    this.id = idInit;
    this.price = price;
  }

  id;
  price;

  setPrice(price) {    
    this.price = price;
    return this;
  }

  withDiscount(percent) {
    const discount = new Product(this.price);
    discount.discountedPrice = discount.price * (100 - percent)/100
    return discount;
  }
}

class Shop {
  products = [];

  addProducts(product) {
    this.products.push(product);
  }

  getProduct(id) {
    const arr = this.products.map(item => item.id);

    return this.products[arr.indexOf(id)];
  }
}


const x = new Product(100);
const y = new Product(200);
const z = new Product(300);
const a = new Product(400);
const b = new Product(500);
const shop = new Shop();
shop.addProducts(x);
shop.addProducts(y);
shop.addProducts(z);
shop.addProducts(a);
shop.addProducts(b);


console.log(shop.getProduct(5).setPrice(3224).withDiscount(10).discountedPrice === 2901.6);