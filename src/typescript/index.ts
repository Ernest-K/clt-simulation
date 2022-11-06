import { chartDimensions } from "./chartDimensions";
import { DistribiutionType } from "./DistribiutionType";
import FormControler from "./FormControler";
import PopulationGenerator from "./PopulationGenerator";

const formControler = new FormControler(
  document.querySelector("form") as HTMLFormElement
);

const populationGenerator = new PopulationGenerator(
  DistribiutionType[`${formControler.getInput().distribution}`]
);

console.log(chartDimensions);

console.log(populationGenerator.getPopulation());
