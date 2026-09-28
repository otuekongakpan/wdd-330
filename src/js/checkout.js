import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckOutProcess.mjs";
import { setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", "form");
order.init();

document.querySelector("#zip").addEventListener("blur", order.calculateItemSummary.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();



    const orderForm = document.forms["checkout"];
    const isValid = orderForm.checkValidity();
    
    if(isValid) {
        order.checkout();
        
    }

    else{
        orderForm.reportValidity();

    }
    
})