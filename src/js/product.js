<<<<<<< HEAD
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const productID = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);
product.init();
=======
import { getParam } from './utils.mjs';

import ProductData from './ProductData.mjs';

import ProductDetails from './ProductDetails.mjs';

const productDetails = new ProductDetails(
  getParam('product'),
  new ProductData('tents'),
);
productDetails.init();
>>>>>>> 6c09c649c2989d44f379a4a6a4dfba3fb691e584
