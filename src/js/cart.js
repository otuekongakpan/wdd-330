import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function getCartItems() {
  const cartItems = getLocalStorage("so-cart") || [];

  return cartItems.map((item) => ({
    quantity: 1,
    ...item,
  }));
}

function renderCartContents() {
  const cartItems = getCartItems();

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      `<p>Your cart is empty.</p>`;
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) cartFooter.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");

  let total = 0;
  cartItems.forEach((item) => {
    total += item.FinalPrice * item.quantity;
  });

  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  cartFooter.classList.remove("hide");
  cartTotal.innerHTML = `$${total.toFixed(2)}`;

  attachQuantityListeners();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider" data-index="${index}">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
    qty:
    <button class="qty-btn qty-decrease" data-index="${index}" aria-label="Decrease quantity">-</button>
    <span class="qty-value">${item.quantity}</span>
    <button class="qty-btn qty-increase" data-index="${index}" aria-label="Increase quantity">+</button>
  </p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateQuantity(index, delta) {
  const cartItems = getCartItems();
  const item = cartItems[index];
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function attachQuantityListeners() {
  document.querySelectorAll(".qty-increase").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number(e.target.dataset.index);
      updateQuantity(index, 1);
    });
  });

  document.querySelectorAll(".qty-decrease").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = Number(e.target.dataset.index);
      updateQuantity(index, -1);
    });
  });
}

renderCartContents();

loadHeaderFooter();