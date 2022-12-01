import * as d3 from "d3";
import { SampleProperties } from "./interfaces";

export default class Sampler {
  private _samples: number[][];
  private _meanSamples: number[];

  constructor(private _sampleProperties: SampleProperties) {
    this._getSamplesFromPopulation();
    this._getMeanFromSamples();
  }

  private _getSamplesFromPopulation(): void {
    this._samples = [...Array(this._sampleProperties.numOfSamples)].map(() => {
      return [...Array(this._sampleProperties.sizeOfSample)].map(() => {
        return this._sampleProperties.population[
          this._randomInt(this._sampleProperties.population.length)
        ];
      });
    });
  }

  private _getMeanFromSamples(): void {
    this._meanSamples = this._samples.map((el) => d3.mean(el) || 0);
  }

  private _randomInt(max: number, min = 0): number {
    return Math.floor(Math.random() * max) + min;
  }

  private _update(): void {
    this._getSamplesFromPopulation();
    this._getMeanFromSamples();
  }

  public get samples(): number[][] {
    return this._samples;
  }

  public get meanSamples(): number[] {
    return this._meanSamples;
  }

  public set sampleProperties(sampleProperties: SampleProperties) {
    this._sampleProperties = sampleProperties;
    this._update();
  }
}
