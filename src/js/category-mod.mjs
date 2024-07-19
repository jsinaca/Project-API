import { renderListWithTemplate, getParams } from "./utils.js";
import { loadListTemplate } from "./recipe-list.mjs";

export default class CategoryMeals {
  constructor(dataSourse, listElement) {
		this.dataSourse = dataSourse;
    this.listElement = listElement;
  }
  async init() {
    const category = getParams("c");

		const getData = await this.dataSourse.getCategoryMeals(category);
    this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
