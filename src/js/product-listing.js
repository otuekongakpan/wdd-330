import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const category = getParam('category') || 'tents';
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);
productList.init();

const heading = document.getElementById('product-heading');
if (heading) {
  const prettyCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  heading.textContent = `Top Products: ${prettyCategory}`;
}

// Wire up the sort dropdown
const sortSelect = document.getElementById('sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    productList.sortList(e.target.value);
  });
}
