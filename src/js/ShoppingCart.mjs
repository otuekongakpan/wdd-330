import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="/product_pages/?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const cartItems = getLocalStorage('so-cart') || [];
    return cartItems;
  }

  renderCart(items) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      items,
      'afterbegin',
      true     // clear old content first
    );
  }
}
