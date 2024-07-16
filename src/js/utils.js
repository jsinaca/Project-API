const RAPIDAPI_KEY = "ba341f0179msh3b704b322f3a8dbp10e46bjsn5769d1e5fbf6";
const HOST = "themealdb.p.rapidapi.com";

export async function loadHeaderFooter() {
    const headerTemp = await loadTemplate("../partials/header.html");
    const footerTemp = await loadTemplate("../partials/footer.html");
    const header = document.querySelector("#main-header");
    const footer = document.querySelector("#main-footer");
    
    renderWithTemplate(headerTemp, header);
    renderWithTemplate(footerTemp, footer);
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export function renderWithTemplate(template, parentElement) {
  parentElement.insertAdjacentHTML("afterbegin", template);
}

export async function loadMenuOptions() {

}
export async function randomMeals() {
  // const baseURL = import.meta.env.VITE_SERVER_URL;
  // const randomMealsUrl = `${baseURL}randomselection.php`;

  const randomMealsUrl = "https://themealdb.p.rapidapi.com/lookup.php?i=52772";
  const options = {
	method: "GET",
	headers: {
		"x-rapidapi-key": RAPIDAPI_KEY,
		"x-rapidapi-host": HOST
	}}

  try {
    const response = await fetch(randomMealsUrl, options);
    console.log(response);
    const result = await response.text();
    console.log(result);
    const parentEl = document.querySelector("main");
    renderListWithTemplate(loadListTemplate, parentEl, result);
    // loadListTemplate(result);
  } catch (error) {
    // console.error(error);
  }
}

export async function loadListTemplate(data) {
  return `<li class="recipe-recipe">
      <a href="/recepies-listing/?recipe=${data.idMeal}">
          <img
          src="${data.strMealThumb}"
          alt="${data.strMeal} image"
          />
          <h3 class="recipe__name">${data.strMeal}</h3>
          <h2 class="recipe__category">${data.strCategory}</h2>
          <p class="product-recipe__origin">$${data.strArea}</p></a
      >
      </li>`

}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}