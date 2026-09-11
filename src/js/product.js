import {getParam} from './utils.mjs';

import ProductData from './ProductData.mjs';

import ProductDetails from './ProductDetails.mjs';

const productDetails = new ProductDetails(getParam('product'), new ProductData('tents'));
productDetails.init();



