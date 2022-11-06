export interface InputSelector {
  distributionInput: HTMLSelectElement;
  numOfSamplesInput: HTMLInputElement;
  numOfSamplesRangeInput: HTMLInputElement;
  sizeOfSampleInput: HTMLInputElement;
  sizeOfSampleRangeInput: HTMLInputElement;
}

export interface InputValue {
  distribution: string;
  numOfSamples: number;
  sizeOfSample: number;
}

export interface SampleProperties {
  population: number[];
  numOfSamples: number;
  sizeOfSample: number;
}
