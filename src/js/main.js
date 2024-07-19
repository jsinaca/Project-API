import { loadHeaderFooter } from "../js/utils.js";
import ExternalServices from "./ExternalServices.mjs"
import RecipesList from "./recipe-list.mjs"

loadHeaderFooter();

const eServ = new ExternalServices();
const parentEl = document.querySelector(".recipe-list");
const rList = new RecipesList(eServ, parentEl);

rList.init();
