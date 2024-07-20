import { renderListWithTemplate, getParams } from "./utils.js";

function loadListTemplate(data) {
  return `<li class="recipe-recipe">
    <a href="/recipe/?recipe=${data.idMeal}">
    <img
    src="${data.strMealThumb}"
    alt="${data.strMeal} image"
    />
    <p class="recipe__name">${data.strMeal}</p>
    </li>`;
};

export default class CategoryMeals {
  constructor(dataSourse, listElement) {
		this.dataSourse = dataSourse;
    this.listElement = listElement;
  }
  async init() {
    const category = getParams("c");
    document.querySelector("title").innerHTML = `Category: ${category}`;
    document.querySelector("h1").innerHTML = `Category: ${category}`;

		const getData = await this.dataSourse.getCategoryMeals(category);
    this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
