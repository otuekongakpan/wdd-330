import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const cartList = document.querySelector('.cart-list');

  if (!cartItems || cartItems.length === 0) {
    cartList.innerHTML = `<p>Your cart is empty.</p>`;
    document.querySelector('.cart-footer').classList.add('hide');
    return;
  }

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );

  cartList.innerHTML = htmlItems.join('');

  let total = 0;

  cartItems.forEach((item) => {
    const quantity = item.quantity || 1;
    total += item.FinalPrice * quantity;
  });

  const cartFooter = document.querySelector('.cart-footer');
  const cartTotal = document.querySelector('.cart-total');

  cartFooter.classList.remove('hide');
  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;

  addQuantityListeners();
}

function cartItemTemplate(item, index) {
  const quantity = item.quantity || 1;

  return `<li class="cart-card divider">
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

    <div class="cart-card__quantity">
      <button type="button" class="quantity-minus" data-index="${index}">-</button>
      <span>qty: ${quantity}</span>
      <button type="button" class="quantity-plus" data-index="${index}">+</button>
    </div>

    <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
  </li>`;
}

function addQuantityListeners() {
  document.querySelectorAll('.quantity-minus').forEach((button) => {
    button.addEventListener('click', decreaseQuantity);
  });

  document.querySelectorAll('.quantity-plus').forEach((button) => {
    button.addEventListener('click', increaseQuantity);
  });
}

function updateCartQuantity(index, newQuantity) {
  const cartItems = getLocalStorage('so-cart');

  if (!cartItems || !cartItems[index]) return;

  if (newQuantity <= 0) {
    cartItems.splice(index, 1);
  } else {
    cartItems[index].quantity = newQuantity;
  }

  localStorage.setItem('so-cart', JSON.stringify(cartItems));
  renderCartContents();
}

function decreaseQuantity(event) {
  const index = Number(event.target.dataset.index);
  const cartItems = getLocalStorage('so-cart');
  const currentQuantity = cartItems[index].quantity || 1;

  updateCartQuantity(index, currentQuantity - 1);
}

function increaseQuantity(event) {
  const index = Number(event.target.dataset.index);
  const cartItems = getLocalStorage('so-cart');
  const currentQuantity = cartItems[index].quantity || 1;

  updateCartQuantity(index, currentQuantity + 1);
}

renderCartContents();

loadHeaderFooter();