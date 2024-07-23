"use strict"
import Search from "./search.mjs";
let slideIndex = 1;

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

  await renderWithTemplate(headerTemp, header);
  await renderWithTemplate(footerTemp, footer);
  await carousel();
  const searchBtn = new Search();
  searchBtn.avilitateSearchBtn();
  
  const icon = document.querySelector(".icon");
  const closeBtn = document.querySelector(".closebtn");
  const cellPhoneNAv = document.querySelector(".menu-options-container");
  if (innerWidth <= 600) {
    
    icon.style.display = "flex";
    closeBtn.style.display = "flex";
    icon.addEventListener("click", () => {cellPhoneNAv.style.width = "100%", cellPhoneNAv.style.removeProperty("display")});
    closeBtn.addEventListener("click", () => cellPhoneNAv.style.width = "0%");
    cellPhoneNAv.style.display = "none";
  } else {
    cellPhoneNAv.style.width = "100%";
    icon.style.display = "none";
    closeBtn.style.display = "none";
  }
  
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export function renderWithTemplate(
  template,
  parentElement,
  possition = "afterbegin",
) {
  parentElement.insertAdjacentHTML(possition, template);
}

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
    return recipeId;
  } else {
    const temp = new URL(link);
    const queryString = temp.search;
    const urlParams = new URLSearchParams(queryString);
    const videoId = urlParams.get(param);
    return videoId;
  }
}
function carousel() {
  const data = getLocalStorage("last-view");
  if (data) {
    if (data.length > 10) {
      data.pop();
      setLocalStorage("last-view", data);
    }
    const parentElement = document.querySelector(".carousel");
    renderWithTemplate("Recenty View", parentElement.previousElementSibling);
    renderListWithTemplate(templateCarousel, parentElement, data, "beforeend");
    const arrows = ` <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>`;
    const buttons = carouselButtons(data);
    renderWithTemplate(arrows, parentElement, "beforeend");
    renderWithTemplate(buttons, parentElement, "afterend");
    document.querySelector(".prev").addEventListener("click", function () {
      showSlides((slideIndex += -1));
    });
    document.querySelector(".next").addEventListener("click", function () {
      showSlides((slideIndex += 1));
    });
    var items = document.querySelectorAll(".dot");
    items.forEach((item) =>
      item.addEventListener("click", function (event) {
        showSlides((slideIndex = parseInt(event.target.dataset.id)));
      }),
    );
    abilitateCarouselButtons();
  }
}
function templateCarousel(element) {
  const temp = `
    <div class="card fade">
    <a href="/recipe/?recipe=${element.idMeal}">    
    <img class="carousel-img" src="${element.strMealThumb}" alt="${element.strMealThumb} image" />
    <p class="carousel-name">${element.strMeal}</p>
    <p class="carousel-area">${element.strArea}</p>
    <p class="carousel-category">${element.strCategory}</p>
    </a></div>
    `;
  return temp;
}
function carouselButtons(data) {
  var but = `<div class="dots">`;
  data.forEach((element, index) => {
    but += `<span class="dot" data-id="${index + 1}"></span>`;
  });
  return but;
}
function abilitateCarouselButtons() {
  showSlides(slideIndex);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("card");
  let dots = document.getElementsByClassName("dot");
  for (var element of slides) {
    element.style.display = "none";
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (var el of dots) {
    el.className = el.className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
