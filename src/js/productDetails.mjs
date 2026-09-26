import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

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
    const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    cartItems.push(this.product);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));

    updateCartCount();

    const cartIcon = document.querySelector(".cart");
    cartIcon.classList.add("cart-animate");
    
    setTimeout(() => {
      cartIcon.classList.remove("cart-animate");
    }, 500);

  }

  renderProductDetails() {

    const isDiscounted = this.product.FinalPrice < this.product.SuggestedRetailPrice;
    const discountPercent = isDiscounted
      ? Math.round(((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100)
      : 0;

    const productDetailsContainer = document.querySelector('.product-detail');
    productDetailsContainer.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2>${this.product.Name}</h2>
      ${isDiscounted ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ''}
      <img src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}">
      <p>$${this.product.ListPrice}</p>
      <p>${this.product.Colors[0].ColorName}</p>

      <p>${this.product.DescriptionHtmlSimple}</p>
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    `;
  }


}