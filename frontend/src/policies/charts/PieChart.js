import React from 'react';
import { PieChart, Pie, XAxis, YAxis, Tooltip, CartesianGrid, Label, Legend, Cell } from 'recharts';
import './Chart.css'

const colours = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const CustomPieChart = (props) => {

    const sortByMonth = (arr) => {
        arr.sort((a, b) => {
            return months.indexOf(a.month)
                - months.indexOf(b.month);
        });
    }
    const getPieChartData = () => {
        let newData = {}
        props.data.map(data => {
            const arr = data.date_of_purchase.split("/");
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const month_index = parseInt(arr[1], 10) - 1;
            const month = months[month_index]
            if (newData[month] !== undefined) {
                newData[month] += 1
            } else {
                newData[month] = 1
            }
        })
        let pieChartdata = []
        for (const key in newData) {
            pieChartdata.push({ "month": key, "policies": newData[key] });
        };
        sortByMonth(pieChartdata)
        return pieChartdata;
    };

    const data = getPieChartData();

    return (
        <PieChart width={600} height={300} className="pie-chart">
            {/* {data.map((element, index) => <Pie nameKey="month" isAnimationActive={true} data={data} cx={150} cy={150} outerRadius={120} fill={colours[index]} label dataKey="policies"/>)} */}
            {/* <Pie nameKey="month" isAnimationActive={true} data={data} cx={150} cy={150} outerRadius={90} fill={colours[4]} label dataKey="policies"/> */}
            <Pie nameKey="month" isAnimationActive={true} data={data} cx={150} cy={150} outerRadius={90} label dataKey="policies">
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colours[index]} />
                    ))
                }
            </Pie>
            <Tooltip />
        </PieChart>
    )
};

export default CustomPieChart;