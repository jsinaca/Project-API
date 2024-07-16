import { loadHeaderFooter } from "../js/utils.js";

// import "dotenv/config";
// "use strict"
const RAPIDAPI_KEY = "ba341f0179msh3b704b322f3a8dbp10e46bjsn5769d1e5fbf6";
const HOST = "tasty.p.rapidapi.com";

const baseURL = import.meta.env.VITE_SERVER_URL;

console.log(RAPIDAPI_KEY);

const input = document.querySelector("input");
const searchBtn = document.querySelector("button");



export default class Recipes {
  constructor() {}
  init() {
	loadHeaderFooter();
    
  }
  async getRecipe(id) {
	const url = `${baseURL}recipes/get-more-info?id=8138`;
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": `${RAPIDAPI_KEY}`,
			"x-rapidapi-host": `${HOST}`
		}
	};
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
  }
}

loadHeaderFooter();
