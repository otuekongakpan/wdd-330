import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const img = product.Image || product.Images?.PrimaryMedium || '';
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${img}" alt="Image of ${product.Name}">
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
    this.list = [];
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.renderList(this.list);
    // add sort listener
    const sortEl = document.getElementById('sort');
    if (sortEl) {
      sortEl.addEventListener('change', (e) => this.sortList(e.target.value));
    }
  }

  sortList(criteria) {
    let sorted = [...this.list];
    if (criteria === 'name-asc') {
      sorted.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === 'name-desc') {
      sorted.sort((a, b) => b.Name.localeCompare(a.Name));
    } else if (criteria === 'price-asc') {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (criteria === 'price-desc') {
      sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }
    this.renderList(sorted);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
  }
}