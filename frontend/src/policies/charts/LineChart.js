import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label, Legend, Cell } from 'recharts';

const colours = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const CustomLineChart = (props) => {

    const sortByMonth = (arr) => {
        arr.sort((a, b) => {
            return months.indexOf(a.month)
                - months.indexOf(b.month);
        });
    }
    const getLineChartData = () => {
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
        console.log(newData)
        let lineChartdata = []
        for (const key in newData) {
            lineChartdata.push({ "month": key, "policies": newData[key] });
        };
        sortByMonth(lineChartdata)
        return lineChartdata;
    };

    const data = getLineChartData();
    console.log(data)

    return (
        <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" interval={0} angle={-20} textAnchor="middle" tick={{fontSize: 14}} >
                <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis>
                <Label value="Policies" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend align="left" height="0px" />
            <Line name="Policies" dataKey="policies" type="monotone"/>
            {/* <Line name="Policies" dataKey="policies" type="monotone">
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colours[index]} />
                    ))
                }
            </Line> */}
        </LineChart>
    )
};

export default CustomLineChart;