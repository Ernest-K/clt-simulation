import * as d3 from "d3";

export const DistribiutionType = {
  uniform: d3.randomUniform(64),
  normal: d3.randomNormal(32, 16),
  logNormal: d3.randomLogNormal(),
  exponential: d3.randomExponential(0.1),
};
