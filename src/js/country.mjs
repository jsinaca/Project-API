import { renderListWithTemplate, getParams } from "./utils.js";

function loadListTemplate(data) {
    return `<li class="country">
    <a href="/recipe/?recipe=${data.idMeal}">
    <img
    src="${data.strMealThumb}"
    alt="${data.strMeal} image"
    />
    <p class="recipe__name">${data.strMeal}</p>
    </li>`;
};

export default class CountryMeals {
  constructor(dataSourse, listElement) {
		this.dataSourse = dataSourse;
    this.listElement = listElement;
  }
  async init() {
    const country = getParams("a");
    document.querySelector("title").innerHTML = `Country: ${country}`;
    document.querySelector("h1").innerHTML = `Country: ${country}`;

    const getData = await this.dataSourse.getCountryMeals(country);
    this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
