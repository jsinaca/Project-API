const baseURL = import.meta.env.VITE_SERVER_URL;
const KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const VITE_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse};
    }
}

export default class ExternalServices {
    constructor() {
      this.options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": KEY,
            "x-rapidapi-host": VITE_HOST,
        }};
  }
  async getRandomMeals() {
    const response = await fetch(baseURL + `randomselection.php`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async findRecipeById(id) {
    const products = await fetch (`${baseURL}lookup.php?i=${id}`, this.options);
    const response = await convertToJson(products);
    return response.meals[0];
  }
  async getCategories() {
    const response = await fetch(baseURL + `categories.php`, this.options);
    const data = await convertToJson(response);
    return data.categories;
  }
  async getCategoryMeals(category) {
    const response = await fetch(baseURL + `filter.php?c=${category}`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }

  async checkout(formData) {
    const temp = JSON.stringify(formData);
    const options = {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: temp
    }
    // console.log(formData);
    var w = await fetch(`${baseURL}checkout`, options);
    return convertToJson(w);
    }
}