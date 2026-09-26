import { getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();
