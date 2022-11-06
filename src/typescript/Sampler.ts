import d3 from "d3";
import { SampleProperties } from "./interfaces";

export default class Sampler {
  N = 10000;
  private samples: number[][];
  private meanSamples: (number | undefined)[];

  constructor(private sampleProperties: SampleProperties) {}

  private getSamplesFromPopulation() {
    this.samples = [...Array(this.sampleProperties.numOfSamples)].map(() => {
      return [...Array(this.sampleProperties.sizeOfSample)].map(() => {
        return this.sampleProperties.population[d3.randomInt(this.N)()];
      });
    });
  }

  private getMeanFromSamples() {
    this.meanSamples = this.samples.map((el) => d3.mean(el));
  }

  public getSamples(): number[][] {
    return samples;
  }

  public getMeanSamples(): (number | undefined)[] {
    return meanSamples;
  }
}
