import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeaderFooter);
} else {
    loadHeaderFooter();
}

const productId = getParam('product');
const dataSource = new ProductData('tents');
const productDetails = new ProductDetails(productId, dataSource);

productDetails.init();
