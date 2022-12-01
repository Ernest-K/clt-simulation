import Chart from "./Chart";
import FormController from "./FormController";
import PopulationGenerator from "./PopulationGenerator";
import Sampler from "./Sampler";
import { distribiutionType } from "./distribiutionType";
import { SampleProperties } from "./interfaces";

export default class ChartController {
  private _formController: FormController;
  private _populationGenerator: PopulationGenerator;
  private _sampler: Sampler;
  private _chart: Chart;

  public init() {
    this._formController = new FormController(
      document.querySelector("form") as HTMLFormElement
    );

    this._formController.bindOnChangeValue(this._onChangeValue);

    this._populationGenerator = new PopulationGenerator(
      distribiutionType[`${this._formController.inputValue.distribution}`]
    );

    this._sampler = new Sampler(this._getSampleProperties());

    this._chart = new Chart(
      document.querySelector(".chart-container") as HTMLElement,
      this._sampler.meanSamples
    );

    this._chart.create();
  }

  private _getSampleProperties(): SampleProperties {
    return {
      population: this._populationGenerator.population,
      numOfSamples: this._formController.inputValue.numOfSamples,
      sizeOfSample: this._formController.inputValue.sizeOfSample,
    };
  }

  private _onChangeValue = () => {
    this._populationGenerator.distribiutionType =
      distribiutionType[`${this._formController.inputValue.distribution}`];
    this._sampler.sampleProperties = this._getSampleProperties();
    this._chart.setMeanSamples(this._sampler.meanSamples);
    this._chart.update();
  };
}
