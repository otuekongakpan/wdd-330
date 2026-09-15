import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const data = await this.dataSource.getData();

    const allowedProducts = ["880RR", "985RF", "985PR", "344YJ"];

    const list = data.filter((product) =>
      allowedProducts.includes(product.Id),
    );

    this.renderList(list);
  }

  getProductPage(id) {
    const pages = {
      "880RR": "marmot-ajax-3.html",
      "985RF": "northface-talus-4.html",
      "985PR": "northface-alpine-3.html",
      "344YJ": "cedar-ridge-rimrock-2.html",
    };

    return pages[id];
  }

  productCardTemplate(product) {
    const imagePath = product.Image.replace("../", "/");

    let discount = "";

    if (product.FinalPrice < product.SuggestedRetailPrice) {
      const discountAmount =
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
        100;

      discount = `<span class="discount">${Math.round(discountAmount)}% OFF</span>`;
    }

    return `
      <li class="product-card">
        <a href="product_pages/${this.getProductPage(product.Id)}">
          <img
            src="${imagePath}"
            alt="${product.Name}"
          />
          ${discount}
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

  renderList(list) {
    renderListWithTemplate(
      this.productCardTemplate.bind(this),
      this.listElement,
      list,
    );
  }
}