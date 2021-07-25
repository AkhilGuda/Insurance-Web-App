import React from 'react';
import BarChart from 'react-bar-chart';

const data = [
  { text: 'Man', value: 500 },
  { text: 'Woman', value: 300 }
];

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const BarChartNative = (props) => {

  const handleBarClick = (element, id) => {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }

  const getBarChartData = () => {
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
    let barChartData = []
    for (const key in newData) {
        barChartData.push({ "text": key, "value": newData[key] });
    };
    return barChartData;
};

  const data = getBarChartData();
  console.log(data)

  return (
    <div>
      <div style={{ width: '50%' }}>
        <BarChart ylabel='Policies'
          width="500"
          height={500}
          margin={margin}
          data={data}
          onBarClick={handleBarClick}
          chartConfig={{
            backgroundColor: '#e26a00',
          }}
        />
      </div>
    </div>
  );
};

export default BarChartNative;