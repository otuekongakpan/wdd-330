import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted 
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        
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
    this.products = [];              // ← store fetched list for re-sorting
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list;            // ← save originals
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

  // ← NEW METHOD
  sortList(sortBy) {
    let sorted = [...this.products];   // copy so originals stay intact

    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      case 'default':
      default:
        // keep original order (already copied)
        break;
    }

    this.renderList(sorted);
  }
}
