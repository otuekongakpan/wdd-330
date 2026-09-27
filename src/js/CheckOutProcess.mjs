import { getLocalStorage } from "../js/utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const service = new ExternalServices();


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
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        // const summaryElement = getLocalStorage(this.key);
        // console.log(this.outputSelector + " #cartTotal")
        const subTotalElement = document.querySelector(this.outputSelector + ' #cartTotal');
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");

        this.itemTotal = this.list.reduce((total, item) => {
            total += item.FinalPrice;
            return total
        }, 0);

        itemNumElement.innerText = this.list.length;
        subTotalElement.innerText = `$${this.itemTotal}`;

    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = parseInt(this.itemTotal) + parseInt(this.shipping) + parseInt(this.tax);

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const itemTotal = document.querySelector(`${this.outputSelector} #total-itms`);
        const subTotal = document.querySelector(`${this.outputSelector} #subtotal`);
        const ShippingEst = document.querySelector(`${this.outputSelector} #shipping-est`);
        const orderTotal = document.querySelector(`${this.outputSelector} #order-total`)



        tax.innerText = `$${this.tax.toFixed(2)}`;
        itemTotal.innerText = this.itemTotal;
        subTotal.innerText = `$${this.subTotal.toFixed(2)}`;
        ShippingEst.innerText = `$${this.shippingEst.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    packageItem(items) {
        const simplifiedField = items.map(item => {
            return {
                id: item.Brand.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: item.quantity

            }
        }
        )
        // console.log(simplifiedField);
        return simplifiedField
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = this.formDataToJSON(formElement);
        // console.log(order);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = this.packageItem(this.list);

        try {
            const response = await service.checkout(order)
            // console.log("Order placed sucessfully!")
        }

        catch (err) {
            // console.log(`Bad response ${err}`)
        }
    }

    formDataToJSON(formElement) {
        const formData = new FormData(formElement);
        const convertedToJSON = {};

        formData.forEach(function (value, key) { convertedToJSON[key] = value });
        return convertedToJSON;
    }

}