import ExternalServices from "./ExternalServices.mjs";
const RAPIDAPI_KEY = "ba341f0179msh3b704b322f3a8dbp10e46bjsn5769d1e5fbf6";
const HOST = "themealdb.p.rapidapi.com";

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

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

export function renderWithTemplate(template, parentElement, possition = "afterbegin") {
  parentElement.insertAdjacentHTML(possition, template);
}

// export async function loadMenuOptions() {}

// export async function randomMeals() {
//   const extServ = new ExternalServices();
//   const meals = await extServ.getRandomMeals();

//   try {
    
//     const parentEl = document.querySelector(".recipe-list");
//     renderListWithTemplate(loadListTemplate, parentEl, meals);
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function loadListTemplate(data) {
  return `<li class="recipe-recipe">
      <a href="/recepies-listing/?recipe=${data.idMeal}">
          <img
          src="${data.strMealThumb}"
          alt="${data.strMeal} image"
          />
          <p class="recipe__name">${data.strMeal}</p>
          <p class="recipe__category">${data.strCategory}</p>
          <p class="product-recipe__origin">$${data.strArea}</p></a>
      </li>`;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function getParams(param, link = undefined) {
  if (!link) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get(param);
    return recipeId
  } else {
    const temp = new URL(link);
    const queryString = temp.search;
    const urlParams = new URLSearchParams(queryString);
    const videoId = urlParams.get(param);
    return videoId

  }
}