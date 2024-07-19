import { renderListWithTemplate } from "./utils.js";

export function loadListTemplate(data) {
	return `<li class="recipe-recipe">
		<a href="/recipe/?recipe=${data.idMeal}">
		<img
		src="${data.strMealThumb}"
		alt="${data.strMeal} image"
		/>
		<p class="recipe__name">${data.strMeal}</p>
		<p class="recipe__category">${data.strCategory}</p>
		<p class="product-recipe__origin">${data.strArea}</p></a
		>
		</li>`;
}

export default class RecipesList {
  constructor(dataSourse, listElement) {
	this.dataSourse = dataSourse;
  this.listElement = listElement;
  }
  async init() {
		const getData = await this.dataSourse.getRandomMeals();
    this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
