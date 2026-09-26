// import ProductData from "./ProductData.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();

const title = document.getElementById("top-products-heading");

title.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase()}`;
