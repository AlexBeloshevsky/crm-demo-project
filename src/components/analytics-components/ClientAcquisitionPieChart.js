import React, { Component } from 'react';
import {ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

class ClientAcquisitionPieChart extends Component {

  render() {
    const data01 = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }]
    return (
      <div className="hiddenPie">
        {/* <ResponsiveContainer width="100%"> */}
        <PieChart width={800} height={400} className="chart">
          <Pie data={data01} cx={200} cy={200} outerRadius={60} fill="#8884d8" label/>
        </PieChart>
        {/* </ResponsiveContainer> */}
      </div>
    );
  }

}


export default ClientAcquisitionPieChart;