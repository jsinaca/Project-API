import { renderListWithTemplate } from "./utils.js";

export function loadListTemplate(data) {
	return `<li class="recipe-recipe">
		<a href="/recipe/?recipe=${data.idMeal}">
		<img
		src="${data.strMealThumb}"
		alt="${data.strMeal} image"
		/>
		<p class="recipe__name">${data.strMeal}</p></a>
		<a href="/c_meals/?c=${data.strCategory}"><p class="recipe__category">${data.strCategory}</p></a>
		<a href="/country/?a=${data.strArea}"><p class="product-recipe__origin">${data.strArea}</p></a>
		</li>`;
}

export default class RecipesList {
  constructor(dataSourse, listElement) {
	this.dataSourse = dataSourse;
  this.listElement = listElement;
  }
  async init() {
		const getData = await this.dataSourse.getRandomMeals();
		await this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
