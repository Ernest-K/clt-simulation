export default class PopulationGenerator {
  private N = 10000;

  constructor(private _distributionType: () => number) {}

  public get population(): number[] {
    return [...Array(this.N)].map(() => this._distributionType());
  }

  public set distributionType(distributionType: () => number) {
    this._distributionType = distributionType;
  }
}
