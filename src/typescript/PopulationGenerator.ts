export default class PopulationGenerator {
  N = 10000;
  constructor(private distribiutionType) {}
  public getPopulation(): number[] {
    return [...Array(this.N)].map(() => this.distribiutionType());
  }
}
