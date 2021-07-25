import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
  Legend,
  Cell,
} from "recharts";

const colours = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomBarChart = (props) => {
  const sortByMonth = (arr) => {
    arr.sort((a, b) => {
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  };

  const getBarChartData = () => {
    let newData = {};
    props.data.map((data) => {
      const arr = data.date_of_purchase.split("/");
      const month_index = parseInt(arr[1], 10) - 1;
      const month = months[month_index];
      if (newData[month] !== undefined) {
        newData[month] += 1;
      } else {
        newData[month] = 1;
      }
    });
    console.log(newData);
    let barChartData = [];
    for (const key in newData) {
      barChartData.push({ month: key, policies: newData[key] });
    }
    sortByMonth(barChartData);
    return barChartData;
  };

  const data = getBarChartData();
  console.log(data);

  // const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  //     return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
  // };

  return (
    <BarChart width={600} height={350} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" interval={0} angle={-20} textAnchor="middle" tick={{fontSize: 14}} >
        <Label value="Month" offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Policies" angle={-90} position="insideLeft" />
      </YAxis>
      <Tooltip />
      <Legend align="left" height="0px" />
      {/* <Bar name="Policies" dataKey="policies" barSize={30}
                label={renderCustomBarLabel} fill={colours[4]} /> */}
      <Bar name="Policies" dataKey="policies" barSize={30}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colours[index]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomBarChart;
