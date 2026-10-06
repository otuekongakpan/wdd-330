import Alert from "./Alert.js";

import { loadHeaderFooter } from "./utils.mjs";

const alert = new Alert();

alert.init();

alert.createAlerts();

alert.displayAlerts();

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count");

  if (!cartCount) return;

  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  cartCount.textContent = cartItems.length;
}

loadHeaderFooter().then(() => {
  updateCartCount();
});