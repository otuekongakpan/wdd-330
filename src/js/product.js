import { getParam } from './utils.mjs';

import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

const productDetails = new ProductDetails(
  getParam('product'),
  new ProductData('tents'),
);
productDetails.init();
