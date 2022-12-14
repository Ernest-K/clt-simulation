import { ChartDimensions } from "./interfaces";

export const chartDimensions: ChartDimensions = {
  width: (document.querySelector(".chart-container") as HTMLElement)
    .offsetWidth,
  height:
    (document.querySelector(".chart-container") as HTMLElement).offsetWidth *
    (3 / 4),
  margins: 40,
};
