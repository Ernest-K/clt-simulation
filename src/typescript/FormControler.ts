import { InputSelector, InputValue } from "./interfaces";

export default class FormControler {
  private inputSelector: InputSelector;
  private inputValue: InputValue;

  constructor(private formSelector: HTMLFormElement) {
    this.getInputSelector();
    this.syncRangeInput();
    this.getInputValue();
    this.getOnChangeInputValue();
  }

  public getInput(): InputValue {
    return this.inputValue;
  }

  private getDistribiutionValue(): string {
    return String(this.inputSelector.distributionInput.value);
  }

  private getNumberOfSamplesValue(): number {
    return Number(this.inputSelector.numOfSamplesInput.value);
  }

  private getSizeOfSampleValue(): number {
    return Number(this.inputSelector.sizeOfSampleInput.value);
  }

  private getInputValue() {
    this.inputValue = {
      distribution: this.getDistribiutionValue(),
      numOfSamples: this.getNumberOfSamplesValue(),
      sizeOfSample: this.getSizeOfSampleValue(),
    };
  }

  private getOnChangeInputValue() {
    Object.entries(this.formSelector).forEach(([, value]) => {
      (value as HTMLFormElement).onchange = () => {
        this.getInputValue();
      };
    });
  }

  private syncRangeInput() {
    this.inputSelector.numOfSamplesInput.value =
      this.inputSelector.numOfSamplesRangeInput.value;

    this.inputSelector.numOfSamplesRangeInput.oninput = (event) =>
      (this.inputSelector.numOfSamplesInput.value = (
        event.target as HTMLInputElement
      ).value);

    this.inputSelector.numOfSamplesInput.oninput = (event) =>
      (this.inputSelector.numOfSamplesRangeInput.value = (
        event.target as HTMLInputElement
      ).value);

    this.inputSelector.sizeOfSampleInput.value =
      this.inputSelector.sizeOfSampleRangeInput.value;

    this.inputSelector.sizeOfSampleRangeInput.oninput = (event) =>
      (this.inputSelector.sizeOfSampleInput.value = (
        event.target as HTMLInputElement
      ).value);

    this.inputSelector.sizeOfSampleInput.oninput = (event) =>
      (this.inputSelector.sizeOfSampleRangeInput.value = (
        event.target as HTMLInputElement
      ).value);
  }

  private getInputSelector() {
    const distributionInput = this.formSelector.querySelector(
      "#distribution"
    ) as HTMLSelectElement;
    const numOfSamplesInput = this.formSelector.querySelector(
      "#num-of-samples"
    ) as HTMLInputElement;
    const numOfSamplesRangeInput = this.formSelector.querySelector(
      "#range-num-of-samples"
    ) as HTMLInputElement;
    const sizeOfSampleInput = this.formSelector.querySelector(
      "#size-of-sample"
    ) as HTMLInputElement;
    const sizeOfSampleRangeInput = this.formSelector.querySelector(
      "#range-size-of-sample"
    ) as HTMLInputElement;

    this.inputSelector = {
      distributionInput,
      numOfSamplesInput,
      numOfSamplesRangeInput,
      sizeOfSampleInput,
      sizeOfSampleRangeInput,
    };
  }
}
