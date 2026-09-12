import { getParam } from './utils.mjs';

import ProductData from './ProductData.mjs';

import ProductDetails from './ProductDetails.mjs';


const productId = getParam('product');
const dataSource = new ProductData('tents');

// console.log(`Testing getparam - product ID is ${productId}`);
// console.log(`testing findproductbyId result ${dataSource.findProductById(productId)}`);

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();