import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted 
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.Name}">
        
        ${isDiscounted ? `<span class="discount-badge">${discountPercent}% OFF</span>` : ''}
        
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        
        <div class="product-card__pricing">
          ${isDiscounted 
            ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>
               <span class="discounted-price">$${product.FinalPrice}</span>` 
            : `<span class="regular-price">$${product.FinalPrice}</span>`
          }
        </div>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      'afterbegin',
      true
    );
  }
}
