import * as d3 from "d3";
import { DistribiutionType } from "./DistribiutionType";
import FormControler from "./FormControler";
import PopulationGenerator from "./PopulationGenerator";

const populationGenerator = new PopulationGenerator(DistribiutionType.uniform);
const formControler = new FormControler(
  document.querySelector("form") as HTMLFormElement
);

console.log(formControler.getInput());
