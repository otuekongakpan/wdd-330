import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';


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
            .addEventListener('click', this.addProductToCart.bind(this))
    }

  init() {
    this.dataSource.findProductById(this.productId).then((product) => {
      this.product = product;
      this.renderProductDetails();
      document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));

        setLocalStorage('so-cart', cart);
    }

    renderProductDetails() {
        const disInfo = document.querySelector(".product-detail__add")

        disInfo.innerHTML = `
        <section class="product-detail">
            <h3>${this.product.Brand.Name}</h3>

            <h2 class="divider">${this.product.Name}</h2>

            <img class="divider"
                src="${this.product.Image}"
                alt="${this.product.Name}" />

            <p class="product-card__price">$${this.product.ListPrice}</p>

            <p class="product__color">${this.product.Colors[0].ColorName}</p>

            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        </section>

    `
    }
}


