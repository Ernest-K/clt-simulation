export default class PopulationGenerator {
  private N = 10000;

  constructor(private _distribiutionType: () => number) {}

  public get population(): number[] {
    return [...Array(this.N)].map(() => this._distribiutionType());
  }

  public set distribiutionType(distribiutionType: () => number) {
    this._distribiutionType = distribiutionType;
  }
}
