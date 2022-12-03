import { chartDimensions } from "./chartDimensions";
import Axes from "./Axes";
import * as d3 from "d3";

export default class Chart {
  private MAX = 64;

  private _chartDimensions = chartDimensions;
  private _buckets;
  private _axes;
  private _svg;
  private _barGroup;
  private _xAxisGroup;
  private _yAxisGroup;

  private _yAccessor = (data) => data.length;

  constructor(
    private _chartContainer: HTMLElement,
    private _meanSamples: number[]
  ) {}

  public setMeanSamples(meanSamples: number[]) {
    this._meanSamples = meanSamples;
  }

  private _createBuckets() {
    const bin = d3
      .bin()
      .domain([0, this.MAX])
      .thresholds(Math.floor(this.MAX / (window.innerWidth < 992 ? 2 : 1)));

    this._buckets = bin(this._meanSamples);
  }

  private _createSvg() {
    this._svg = d3
      .select(this._chartContainer)
      .append("svg")
      .attr("width", this._chartDimensions.width)
      .attr("height", this._chartDimensions.height);
  }

  private _createBarGroup() {
    this._barGroup = this._svg
      .append("g")
      .classed("bar-group", true)
      .attr(
        "transform",
        `translate(${this._chartDimensions.margins}, ${this._chartDimensions.margins})`
      )
      .append("g");
  }

  private _createBar() {
    this._barGroup
      .selectAll("rect")
      .data(this._buckets)
      .join("rect")
      .transition()
      .attr("x", (d) => this._axes.xScale(d.x0) + 1)
      .attr("width", (d) =>
        d3.max([0, this._axes.xScale(d.x1) - this._axes.xScale(d.x0) - 2])
      )
      .attr("y", (d) => this._axes.yScale(this._yAccessor(d)))
      .attr(
        "height",
        (d) =>
          this._chartDimensions.height -
          2 * this._chartDimensions.margins -
          this._axes.yScale(this._yAccessor(d))
      );
  }

  private _createYAxisGroup() {
    this._yAxisGroup = this._svg
      .append("g")
      .attr(
        "transform",
        `translate(${this._chartDimensions.margins}, ${this._chartDimensions.margins})`
      );
  }

  private _createXAxisGroup() {
    this._xAxisGroup = this._svg
      .append("g")
      .attr(
        "transform",
        `translate(${this._chartDimensions.margins}, ${
          this._chartDimensions.height - this._chartDimensions.margins
        })`
      );
  }

  private _appendYAxis(yAxis) {
    this._yAxisGroup.transition().call(yAxis);
  }

  private _appendXAxis(xAxis) {
    this._xAxisGroup.transition().call(xAxis);
  }

  public create() {
    this._createBuckets();
    this._createSvg();
    this._createYAxisGroup();
    this._createXAxisGroup();

    this._axes = new Axes(this._buckets, this._chartDimensions, this.MAX);

    this._appendYAxis(this._axes.yAxis);
    this._appendXAxis(this._axes.xAxis);

    this._createBarGroup();
    this._createBar();
  }

  public update() {
    this._createBuckets();

    this._axes.buckets = this._buckets;
    this._axes.update();

    this._appendYAxis(this._axes.yAxis);
    this._appendXAxis(this._axes.xAxis);

    this._createBar();
  }
}
