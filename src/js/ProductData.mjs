function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() { }
  async getData(category) {
    try {
      const baseURL = import.meta.env.VITE_SERVER_URL;
      if (baseURL) {
        const response = await fetch(`${baseURL}products/search/${category}`);
        const data = await convertToJson(response);
        if (data && data.Result && data.Result.length > 0) {
          return data.Result;
        }
      }
    } catch (e) { }
    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);
    return data;
  }
  async findProductById(id) {
    try {
      const baseURL = import.meta.env.VITE_SERVER_URL;
      if (baseURL) {
        const response = await fetch(`${baseURL}product/${id}`);
        const data = await convertToJson(response);
        return data.Result;
      }
    } catch (e) { }
    const products = await this.getData('tents');
    return products.find((item) => item.Id === id);
  }
}