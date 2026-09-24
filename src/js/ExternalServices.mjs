const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    return await fetch(`${baseURL}checkout`, options);
  }

  async register(formElement) {
    const formData = new FormData(formElement);
    const avatarFile = formData.get('avatar');

    if (!avatarFile || avatarFile.size === 0) {
      formData.delete('avatar');

      const payload = {};
      for (const [key, value] of formData.entries()) {
        payload[key] = typeof value === 'string' ? value.trim() : value;
      }

      const jsonOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      };
      return await fetch(`${baseURL}users`, jsonOptions);
    }

    const multiOptions = {
      method: 'POST',
      body: formData
    };
    return await fetch(`${baseURL}users`, multiOptions);
  }
}