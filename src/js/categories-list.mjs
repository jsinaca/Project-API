import { renderListWithTemplate } from "./utils.js";

export function loadListTemplate(data) {
	return `<li class="category">
		<a href="/category-meals/filter.php?c=${data.strCategory}">
		<img
		src="${data.strCategoryThumb}"
		alt="${data.strCategory} image"
		/>
		<p class="category__name">${data.strCategory}</p>
		</a
		>
		</li>`;
}

export default class CategoriesList {
  constructor(dataSourse, listElement) {
	this.dataSourse = dataSourse;
  this.listElement = listElement;
  }
  async init() {
		const getData = await this.dataSourse.getCategories();
    this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
