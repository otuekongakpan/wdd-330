import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData();
        this.createSortControls();
        this.renderList(this.products);
    }

    createSortControls() {
        const sortContainer = document.createElement('div');
        sortContainer.classList.add('product-sort');

        sortContainer.innerHTML = `
            <label for="sort-products">Sort products by:</label>
            <select id="sort-products">
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
            </select>
        `;

        this.listElement.parentElement.insertBefore(
            sortContainer,
            this.listElement
        );

        const sortSelect = sortContainer.querySelector('#sort-products');

        sortSelect.addEventListener('change', (event) => {
            this.sortProducts(event.target.value);
        });
    }

    sortProducts(sortOption) {
        const sortedProducts = [...this.products];

        switch (sortOption) {
            case 'name-asc':
                sortedProducts.sort((a, b) =>
                    a.Name.localeCompare(b.Name)
                );
                break;

            case 'name-desc':
                sortedProducts.sort((a, b) =>
                    b.Name.localeCompare(a.Name)
                );
                break;

            case 'price-asc':
                sortedProducts.sort(
                    (a, b) => Number(a.FinalPrice) - Number(b.FinalPrice)
                );
                break;

            case 'price-desc':
                sortedProducts.sort(
                    (a, b) => Number(b.FinalPrice) - Number(a.FinalPrice)
                );
                break;
        }

        this.renderList(sortedProducts);
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