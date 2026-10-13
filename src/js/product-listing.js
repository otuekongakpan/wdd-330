
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  const searchTerm = getParam("search");
  const category = getParam("category");
  const dataSource = new ExternalServices();
  const listElement = document.querySelector(".product-list");
  const title = document.getElementById("top-products-heading");

  if (!listElement || !title) {
    console.error("Product list or heading was not found.");
    return;
  }

  if (searchTerm) {
    title.textContent = `Search Results: ${searchTerm}`;
    await searchProducts(searchTerm, dataSource, listElement);
    return;
  }

  if (category) {
    title.textContent =
      `Top Products: ${category.charAt(0).toUpperCase()}${category.slice(1)}`;

    const productList = new ProductList(
      category,
      dataSource,
      listElement
    );

    await productList.init();
  }
}

async function searchProducts(searchTerm, dataSource, listElement) {
  const categories = [
    "tents",
    "backpacks",
    "sleeping-bags",
    "hammocks"
  ];

  try {
    const results = await Promise.all(
      categories.map(category => dataSource.getData(category))
    );

    const allProducts = results.flat();
    const query = searchTerm.toLowerCase();

    const matches = allProducts.filter(product =>
      product.Name?.toLowerCase().includes(query) ||
      product.Brand?.Name?.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      listElement.innerHTML = "<li>No matching products found.</li>";
      return;
    }

    const matchingList = new ProductList(
      "",
      { getData: async () => matches },
      listElement
    );

    await matchingList.init();
  } catch (error) {
    console.error("Product search failed:", error);
    listElement.innerHTML =
      "<li>Unable to search products. Please try again.</li>";
  }
}

document.addEventListener("submit", event => {
  if (event.target.id !== "product-search-form") return;

  event.preventDefault();

  const input = document.getElementById("product-search-input");
  const query = input?.value.trim();

  if (query) {
    window.location.href =
      `/product_listing/index.html?search=${encodeURIComponent(query)}`;
  }
});

init();
