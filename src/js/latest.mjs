import { renderListWithTemplate } from "./utils.js";

function loadListTemplate(data) {
    return `<li class="latest">
			<a href="/recipe/?recipe=${data.idMeal}">
			<img
			src="${data.strMealThumb}"
			alt="${data.strMeal} image"
			/>
			<p class="recipe__name">${data.strMeal}</p>
			</li>`;
};

export default class Latest {
  constructor(dataSourse, listElement) {
	this.dataSourse = dataSourse;
    this.listElement = listElement;
  }
  async init() {
    const latest = await this.dataSourse.latest();
    document.querySelector("title").innerHTML = `Latest Meals`;
    document.querySelector("h1").innerHTML = `Latest Meals`;

    this.renderList(latest);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
