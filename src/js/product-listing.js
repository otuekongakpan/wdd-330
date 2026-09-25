import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(category, dataSource, listElement);
myList.init();

const title = document.getElementById("top-products-heading");
if (title) {
  if (category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    title.textContent = `Top Products: ${formattedCategory}`;
  } else {
    title.textContent = "Top Products";
  }
}