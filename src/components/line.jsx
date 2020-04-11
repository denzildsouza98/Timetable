import React from "react";
import { Chart } from "react-google-charts";

export default function Line(props) {
  const lineChart = (
    <Chart
      width={"600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={props.data}
      options={{
        hAxis: {
          title: "Iteration",
          maxValue: 10,
          ticks: [{ v: 0, f: "Intial" }, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        vAxis: {
          title: "Fitness",
          maxValue: 100,
        },
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
  return lineChart;
}
