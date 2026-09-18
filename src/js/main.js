import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeaderFooter);
} else {
    loadHeaderFooter();
}

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, listElement);

productList.init();
