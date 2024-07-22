"use strict"
const baseURL = import.meta.env.VITE_SERVER_URL;

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
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
        }};
  }
  async getRandomMeals() {
    const response = await fetch(baseURL + `randomselection.php`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async getRandomMeal() {
    const response = await fetch(baseURL + `random.php`, this.options);
    const data = await convertToJson(response);
    return data.meals[0];
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
    const response = await fetch(`${baseURL}filter.php?c=${category}`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async getCountries() {
    const response = await fetch(`${baseURL}list.php?a=list`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async getCountryMeals(country) {
    const response = await fetch(`${baseURL}filter.php?a=${country}`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async latest() {
    const response = await fetch(`${baseURL}latest.php`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
  async search(ingredient) {
    const response = await fetch(`${baseURL}filter.php?i=${ingredient}`, this.options);
    const data = await convertToJson(response);
    return data.meals;
  }
}