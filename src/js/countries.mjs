import { renderListWithTemplate } from "./utils.js";

function loadListTemplate(data) {
  return `<li class="country">
    <a href="/country/?a=${data.strArea}">${data.strArea}</a>
    </li>`;
};

export default class Countries {
  constructor(dataSourse, listElement) {
		this.dataSourse = dataSourse;
    this.listElement = listElement;
  }
  async init() {
    document.querySelector("title").innerHTML = `Countries`;
    document.querySelector("h1").innerHTML = `Countries`;

    const getData = await this.dataSourse.getCountries();
      this.renderList(getData);
  }
	renderList(data) {
		renderListWithTemplate(loadListTemplate, this.listElement, data);
	}
}
