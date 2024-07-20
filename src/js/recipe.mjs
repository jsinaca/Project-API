import e from "connect-flash";
import { loadHeaderFooter, renderWithTemplate, getParams, getLocalStorage, setLocalStorage } from "./utils.js";

export default class RecipeDetails {
  constructor(services, id = undefined) {
    this.id = id;
    this.services = services;
    this.recipe = {};
  }
  async init() {
    loadHeaderFooter();
	if (this.id) {
		this.recipe = await this.services.findRecipeById(this.id);

	} else {
		this.recipe = await this.services.getRandomMeal();
	}
		document.querySelector("title").innerHTML = this.recipe.strMeal
    this.loadDetails();
	this.lastViews();
  }

	async loadDetails() {
		const title = document.querySelector("h1");
		title.innerHTML = this.recipe.strMeal;
		const recipe = document.querySelector(".recipe");
		const rec = await this.renderRecipe();
		renderWithTemplate(rec, recipe);

		const [ingredients, measure] = this.getIngredientsAndMesure();
		const pair = Object.assign.apply({}, ingredients.map((value, index) => ({[value]: measure[index]})));
		this.loadIngredients(pair);
	}

	async renderRecipe() {
		const instructionsCorrections = this.recipe.strInstructions.replaceAll("\n", "<br>");
		const correctVideo = getParams("v", this.recipe.strYoutube);
		
		return `<a href="/country/?a=${this.recipe.strArea}">${this.recipe.strArea}</a>
		<a href="/c_meals/?c=${this.recipe.strCategory}">${this.recipe.strCategory}</a><br>
		<img src="${this.recipe.strMealThumb}" alt="${this.recipe.strMeal} image"/>
		<div class="ingredients-list"></div>
		<div class="instructions">${instructionsCorrections}</div>
		<iframe width="420" height="315" src="https://www.youtube.com/embed/${correctVideo}">
		</iframe>`;
	}
	
	getIngredientsAndMesure() {
		var ingredients = [];
		var measure = [];
		
		for (const [key,value] of Object.entries(this.recipe)) {
			if (key.search("strIngredient") != -1 && value != "") {
				ingredients.push(value);
			}
			if (key.search("strMeasure") != -1 && value != "" && value != " ") {
				measure.push(value);
			}
		}
		return [ingredients, measure];
	}
	
	loadIngredients(data) {
		const il = document.querySelector(".ingredients-list");
		var listIngredients = "";
		for (const ingredient in data) {
			listIngredients += `<input type="checkbox" id="${ingredient}" name="${ingredient}" value="${ingredient}">
				<label for="${ingredient}">${ingredient} - ${data[ingredient]}</label><br>`
		}
		const output = `
			<form>
				<fieldset>
        	<legend>Ingredients</legend>
				${listIngredients}
				</fieldset>
			</form><br><br>
		`
		renderWithTemplate(output, il, "beforeend");
	}
	lastViews() {
		try {
			var localS = getLocalStorage("last-view");
			// var ids;
			if (localS) {
				const ids = localS.map((item) => item.idMeal);
				if (ids.find((id) => id == this.recipe.idMeal)) {
					localS.unshift((localS.splice(ids.findIndex((el) => el == this.recipe.idMeal), 1)[0]));
				} else {
					localS.unshift(this.recipe);
				}
				setLocalStorage("last-view", localS)
			} else {
				setLocalStorage("last-view", [this.recipe])
			}
		}catch {
			new Error("An error has occur")
		}
	}
}