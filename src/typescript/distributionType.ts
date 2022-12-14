import * as d3 from "d3";

export const distributionType = {
  uniform: d3.randomUniform(64),
  normal: d3.randomNormal(32, 8),
  logNormal: d3.randomLogNormal(2, 1.25),
  exponential: d3.randomExponential(0.04),
  skewedLeft: () => 64 - d3.randomExponential(0.04)(),
  twoNormal: () =>
    Math.random() > 0.5
      ? d3.randomNormal(64 * 0.3, 5)()
      : d3.randomNormal(64 * 0.7, 5)(),
};
