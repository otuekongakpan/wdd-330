// import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
// import Alert from "./Alert.js";
// import { loadHeaderFooter } from "./utils.mjs";

// const dataSource = new ExternalServices('tents');
// const listElement = document.querySelector('.product-list');
// const productList = new ProductList('tents', dataSource, listElement);

// productList.init();

// const alert = new Alert();
// alert.init();
// alert.createAlerts();
// alert.displayAlerts();
// loadHeaderFooter();


import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs"; 

const alert = new Alert();
alert.init();
alert.createAlerts();
alert.displayAlerts();

loadHeaderFooter();
