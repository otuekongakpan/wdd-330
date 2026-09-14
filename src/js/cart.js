import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  
  if (cartItems !== null && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    let total = 0;
    cartItems.map((item) => {
      total += item.FinalPrice;
    });

    document.querySelector('.cart-footer').classList.remove('hide');

    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();