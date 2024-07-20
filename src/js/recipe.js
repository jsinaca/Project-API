import ExternalServices from "./ExternalServices.mjs";
import RecipeDetails from "./recipe.mjs";
import { getParams } from "./utils.js";

const recipeId = getParams("recipe");
const dataSource = new ExternalServices();

const recipe = new RecipeDetails(dataSource, recipeId);

recipe.init();
