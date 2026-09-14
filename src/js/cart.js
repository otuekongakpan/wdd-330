import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const listElement = document.querySelector('.product-list');
const cart = new ShoppingCart(listElement);
const cartItems = cart.init();

// Empty cart state
if (!cartItems || cartItems.length === 0) {
  listElement.innerHTML = '<p>Your cart is empty.</p>';
} else {
  // Render items using the class
  cart.renderCart(cartItems);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  const cartFooter = document.querySelector('.cart-footer');
  const cartTotal = document.querySelector('.cart-total');

  cartFooter.classList.remove('hide');
  cartTotal.innerHTML = `$${total.toFixed(2)}`;
}
