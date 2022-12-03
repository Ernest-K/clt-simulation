import * as d3 from "d3";
import { ChartDimensions } from "./interfaces";

export default class Axes {
  private _yScale;
  private _xScale;
  private _yAxis;
  private _xAxis;

  private _yAccessor = (data) => data.length;

  constructor(
    private _buckets: number[],
    private _chartDimensions: ChartDimensions,
    private MAX: number
  ) {
    this.update();
  }

  private _createYScale(): void {
    this._yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this._buckets as number[], this._yAccessor)])
      .range([
        this._chartDimensions.height - 2 * this._chartDimensions.margins,
        0,
      ])
      .nice();
  }

  private _createXScale(): void {
    this._xScale = d3
      .scaleLinear()
      .domain([0, this.MAX])
      .range([
        0,
        this._chartDimensions.width - 2 * this._chartDimensions.margins,
      ]);
  }

  private _createYAxis(): void {
    this._yAxis = d3.axisLeft(this._yScale);
  }

  private _createXAxis(): void {
    this._xAxis = d3
      .axisBottom(this._xScale)
      .tickValues(this._getTicksValues());

    console.log(this._getTicksValues());
  }

  public get yScale() {
    return this._yScale;
  }

  public get xScale() {
    return this._xScale;
  }

  public get yAxis() {
    return this._yAxis;
  }

  public get xAxis() {
    return this._xAxis;
  }

  public set buckets(buckets) {
    this._buckets = buckets;
  }

  public set chartDimensions(chartDimensions) {
    this._chartDimensions = chartDimensions;
  }

  public update(): void {
    this._createYScale();
    this._createXScale();
    this._createYAxis();
    this._createXAxis();
  }

  private _getTicksValues(): number[] {
    const tickValues: number[] = [];
    for (
      let index = 0;
      index <= this.MAX;
      index += window.innerWidth < 992 ? 4 : 2
    ) {
      tickValues.push(index);
    }
    return tickValues;
  }
}
