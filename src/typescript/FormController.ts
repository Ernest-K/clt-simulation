import { InputSelectors, InputValue } from "./interfaces";

export default class FormController {
  private _inputSelectors: InputSelectors;
  private _inputValue: InputValue;
  private _onChangeValue: () => void;

  constructor(private _formSelector: HTMLFormElement) {
    this._getInputSelector();
    this._syncRangeInput();
    this._getInputValue();
    this._getOnChangeInputValue();
  }

  private _getDistribiutionValue(): string {
    return String(this._inputSelectors.distributionInput.value);
  }

  private _getNumberOfSamplesValue(): number {
    return Number(this._inputSelectors.numOfSamplesInput.value);
  }

  private _getSizeOfSampleValue(): number {
    return Number(this._inputSelectors.sizeOfSampleInput.value);
  }

  private _getInputValue(): void {
    this._inputValue = {
      distribution: this._getDistribiutionValue(),
      numOfSamples: this._getNumberOfSamplesValue(),
      sizeOfSample: this._getSizeOfSampleValue(),
    };
  }

  public bindOnChangeValue(callback: () => void): void {
    this._onChangeValue = callback;
  }

  private _getOnChangeInputValue(): void {
    Object.entries(this._formSelector).forEach(([, value]) => {
      (value as HTMLFormElement).onchange = () => {
        this._getInputValue();
        this._onChangeValue();
      };
    });
  }

  private _syncRangeInput(): void {
    this._inputSelectors.numOfSamplesInput.value =
      this._inputSelectors.numOfSamplesRangeInput.value;

    this._inputSelectors.numOfSamplesRangeInput.oninput = (event) =>
      (this._inputSelectors.numOfSamplesInput.value = (
        event.target as HTMLInputElement
      ).value);

    this._inputSelectors.numOfSamplesInput.oninput = (event) =>
      (this._inputSelectors.numOfSamplesRangeInput.value = (
        event.target as HTMLInputElement
      ).value);

    this._inputSelectors.sizeOfSampleInput.value =
      this._inputSelectors.sizeOfSampleRangeInput.value;

    this._inputSelectors.sizeOfSampleRangeInput.oninput = (event) =>
      (this._inputSelectors.sizeOfSampleInput.value = (
        event.target as HTMLInputElement
      ).value);

    this._inputSelectors.sizeOfSampleInput.oninput = (event) =>
      (this._inputSelectors.sizeOfSampleRangeInput.value = (
        event.target as HTMLInputElement
      ).value);
  }

  private _getInputSelector(): void {
    const distributionInput = this._formSelector.querySelector(
      "#distribution"
    ) as HTMLSelectElement;
    const numOfSamplesInput = this._formSelector.querySelector(
      "#num-of-samples"
    ) as HTMLInputElement;
    const numOfSamplesRangeInput = this._formSelector.querySelector(
      "#range-num-of-samples"
    ) as HTMLInputElement;
    const sizeOfSampleInput = this._formSelector.querySelector(
      "#size-of-sample"
    ) as HTMLInputElement;
    const sizeOfSampleRangeInput = this._formSelector.querySelector(
      "#range-size-of-sample"
    ) as HTMLInputElement;

    this._inputSelectors = {
      distributionInput,
      numOfSamplesInput,
      numOfSamplesRangeInput,
      sizeOfSampleInput,
      sizeOfSampleRangeInput,
    };
  }

  public get inputValue(): InputValue {
    return this._inputValue;
  }
}
