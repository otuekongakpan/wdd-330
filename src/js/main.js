// src/main.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Get the element where products will be displayed
const productListElement = document.querySelector('.product-list');

// Create the data source
const dataSource = new ProductData('tents');

// Create an instance of ProductList for the 'tents' category
const productList = new ProductList('tents', dataSource, productListElement);

// Load and render the product list
productList.init();
