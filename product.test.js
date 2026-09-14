import ProductDetails from "./src/js/ProductDetails.mjs";
import { getLocalStorage } from "./src/js/utils.mjs";

describe("cart storage behavior", () => {
  beforeEach(() => {
    global.localStorage = {
      store: {},
      getItem(key) {
        return this.store[key] ?? null;
      },
      setItem(key, value) {
        this.store[key] = String(value);
      },
      removeItem(key) {
        delete this.store[key];
      },
    };
  });

  test("addProductToCart appends to the existing cart array", () => {
    const product = { Id: "abc123", Name: "Test Tent" };
    const details = new ProductDetails("abc123", {});
    details.product = product;

    global.localStorage.setItem(
      "so-cart",
      JSON.stringify([{ Id: "other", Name: "Existing Item" }]),
    );

    details.addProductToCart();

    expect(JSON.parse(global.localStorage.getItem("so-cart"))).toEqual([
      { Id: "other", Name: "Existing Item" },
      product,
    ]);
  });

  test("getLocalStorage returns an empty array when the cart is empty", () => {
    expect(getLocalStorage("so-cart")).toEqual([]);
  });
});
