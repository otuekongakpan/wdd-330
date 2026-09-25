import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ProductComments from './productComments.js';

const productId = getParam("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();
