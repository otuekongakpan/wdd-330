import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeaderFooter);
} else {
  loadHeaderFooter();
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartList = document.querySelector('.product-list');

  if (!cartList) return;

  if (!cartItems.length) {
    cartList.innerHTML = '<li><p>Your cart is empty.</p></li>';
    return;
  }

  cartList.innerHTML = cartItems
    .map(
      (item, index) => `
        <li class="cart-card divider">
          <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
            <img src="${item.Image}" alt="${item.Name}" />
          </a>
          <a href="../product_pages/index.html?product=${item.Id}">
            <h2 class="card__name">${item.Name}</h2>
          </a>
          <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'Standard color'}</p>
          <p class="cart-card__quantity">qty: 1</p>
          <p class="cart-card__price">$${item.FinalPrice ?? item.ListPrice ?? 0}</p>
          <button class="cart-card__remove" data-index="${index}">Remove</button>
        </li>
      `,
    )
    .join('');

  document.querySelectorAll('.cart-card__remove').forEach((button) => {
    button.addEventListener('click', removeFromCart);
  });
}

function removeFromCart(event) {
  const index = event.target.getAttribute('data-index');
  const cartItems = getLocalStorage('so-cart') || [];

  cartItems.splice(index, 1);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

document.addEventListener('DOMContentLoaded', renderCartContents);
