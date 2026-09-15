export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  init() {
    this.dataSource.findProductById(this.productId).then((product) => {
      this.product = product;
      this.renderProductDetails();

      document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));

    });
  }

  addProductToCart() {
    const cartItems = JSON.parse(localStorage.getItem('so-cart')) || [];
    cartItems.push(this.product);
    localStorage.setItem('so-cart', JSON.stringify(cartItems));

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
