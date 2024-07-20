import ExternalServices from "./ExternalServices.mjs";
import RecipeDetails from "./recipe.mjs";

const dataSource = new ExternalServices();

const random = new RecipeDetails(dataSource);

random.init();
