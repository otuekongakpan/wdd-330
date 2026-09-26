import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    };
  });
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
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    try {
      const res = await services.checkout(json);
      console.log("Checkout Success:", res);
      localStorage.removeItem(this.key);
      location.assign("/checkout/success.html");
    } catch (err) {
      console.log("Checkout Error Caught:", err);

      const existingAlerts = document.querySelectorAll(".alert");
      existingAlerts.forEach((alert) => document.querySelector("main").removeChild(alert));

      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
    }
  }
}