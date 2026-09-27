import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckOutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", "form");
order.init();

document.querySelector("#zip").addEventListener("blur", order.calculateItemSummary.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    order.checkout();
})