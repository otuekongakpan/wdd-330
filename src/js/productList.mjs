
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <img src='${product.Image}' alt='${product.NameWithoutBrand}'/>
        <h3 class= 'card_rand'>${product.Brand.Name}</h3>
        <h2 class='card_name'>${product.Name}</h2>
        <p class='product-card_price'>${product.ListPrice}</h2>
        </a>
        </li>      `
}

export default class ProductList {
    constructor(category, dataSource) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = this.listElement
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}