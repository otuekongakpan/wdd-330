import ProductComments from './productComments.js'; // W04

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

      // W04 - Initialize comments
      const comments = new ProductComments(this.productId, 'comment-list');
      comments.init();
    });
  }

  addProductToCart() {
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    cartItems.push(this.product);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }

  renderProductDetails() {
    const isDiscounted = this.product.FinalPrice < this.product.SuggestedRetailPrice;
    const discountPercent = isDiscounted
      ? Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100)
      : 0;

    // Handle both API formats (Images.PrimaryLarge vs Image)
    const productImage = this.product.Images?.PrimaryLarge || this.product.Image;
    const brandName = this.product.Brand?.Name || "";
    const colorName = this.product.Colors?.[0]?.ColorName || "";

    const productDetailsContainer = document.querySelector('.product-detail');
    productDetailsContainer.innerHTML = `
      <h3>${brandName}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand || this.product.Name}</h2>
      <img class="divider" src="${productImage}" alt="${this.product.Name}">
      
      <p class="product-card__price">
        ${isDiscounted ? `<span class="product-card__discount"> $${this.product.SuggestedRetailPrice.toFixed(2)}</span>` : ""}
        $${this.product.FinalPrice}
        ${isDiscounted ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ''}
      </p>
      
      <p class="product__color">${colorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}