import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get the product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details
    this.renderProductDetails();

    // Add a listener to the Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cart = getLocalStorage('so-cart') || [];

    cart.push(this.product);

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.querySelector('.product-detail').innerHTML = `
      <h3>${this.product.Brand.Name}</h3>

      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.Name}"
      />

      <p class="product-card__price">$${this.product.FinalPrice}</p>

      <p class="product__color">${this.product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">
          Add to Cart
        </button>
      </div>
    `;
  }
}