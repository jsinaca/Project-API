import { renderListWithTemplate,loadHeaderFooter,getParams } from "./utils.js";

export function listTemplate(data) {
	return `<li class="ing-recipe">
		<a href="/recipe/?recipe=${data.idMeal}">
		<img
		src="${data.strMealThumb}"
		alt="${data.strMeal} image"
		/>
		<p class="category__name">${data.strMeal}</p>
		</a>
		</li>`;
}

export default class Search {
  constructor(dataSourse) {
		this.dataSourse = dataSourse;
		this.meals = {};
		this.word = "";
	}
  async init() {
		await loadHeaderFooter();
		this.word = getParams("i");
		await this.searchMeals(this.word);
		await this.renderList(this.meals);
	}
	
	renderList(data) {
		const title = document.querySelector("h1");
		if (data) {
			title.innerHTML = `Ingredient: ${this.word[0].toUpperCase() + this.word.slice(1)}`;
			const listElement = document.querySelector(".ing-list");
			renderListWithTemplate(listTemplate, listElement, data);
		} else {
			title.innerHTML = "We coulndn't find any recipe with that ingredient, try with another ingredient"
		}
	}
	async searchW(event){
		if (event.code == "Enter") {
			const word = event.target.value;
			this.redirect(word);
		}
	}
	async redirect(word) {
		var search = window.location.search;
		const newSearch = `?i=${word}`;
		if (search != newSearch) {
			const newSearchPath = `${window.location.origin}/search/?i=${word}`;
			window.location.href = newSearchPath;
		}
	}
	avilitateSearchBtn() {
		document.querySelector(".search").addEventListener("keypress", this.searchW.bind(this));
		document.querySelector(".search-btn").addEventListener("click", this.searchBtn.bind(this));
	}
	async searchMeals(ingredient) {
		const data = await this.dataSourse.search(ingredient);
		this.meals = data;
	}
	async searchBtn (butt) {
		const word = butt.target.parentElement.firstElementChild.value;
		this.redirect(word);
	}
}
