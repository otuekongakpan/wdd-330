import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(this.product);
  setLocalStorage('so-cart', cartItems);
  alertMessage(`${this.product.NameWithoutBrand} added to cart!`, false);
}

  renderProductDetails() {
    const element = document.getElementById('productDetail');

    // Discount calculation
    const isDiscounted = this.product.FinalPrice < this.product.SuggestedRetailPrice;
    const discountAmount = (this.product.SuggestedRetailPrice - this.product.FinalPrice).toFixed(2);
    const discountPercent = isDiscounted
      ? Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100)
      : 0;

    element.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.Name}"
      />

      <div class="product-detail__price">
        ${
          isDiscounted
            ? `<span class="original-price">$${this.product.SuggestedRetailPrice}</span>
               <span class="discounted-price">$${this.product.FinalPrice}</span>
               <span class="discount-flag">Save $${discountAmount} (${discountPercent}% OFF)</span>`
            : `<span class="regular-price">$${this.product.FinalPrice}</span>`
        }
      </div>

      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
