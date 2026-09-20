import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

// Converts a form element into a plain object keyed by input "name"
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // Each entry = 1 unit (your cart pushes duplicates as separate items)
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    const numItems = this.list.length;

    document.querySelector(`${this.outputSelector} #num-items`).innerText = numItems;
    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Tax: 6% of subtotal
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 first item + $2 each additional item
    const numItems = this.list.length;
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).innerText =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #orderTotal`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  // Groups duplicate cart entries into single entries with a quantity count.
  // The server expects each product once, with "quantity" telling it how many.
  packageItems(items) {
    const grouped = {};

    items.forEach(item => {
      if (grouped[item.Id]) {
        grouped[item.Id].quantity += 1;
      } else {
        grouped[item.Id] = {
          id: item.Id,
          name: item.Name,
          price: item.FinalPrice,
          quantity: 1
        };
      }
    });

    return Object.values(grouped);
  }

  async checkout(form) {
    const order = formDataToJSON(form);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = this.packageItems(this.list);

    const res = await services.checkout(order);
    return res;
  }
}