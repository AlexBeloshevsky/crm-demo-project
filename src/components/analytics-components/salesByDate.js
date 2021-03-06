import React, { Component } from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SalesByDateChart extends Component {

  render() {
    let data = this.props.salesByDate;
    // console.log(this.props.salesByDate)
    return (
      <div>
        <h3>Sales By Date</h3>
        <ResponsiveContainer width="100%">
          <LineChart width={600} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }} className="chart">
            <XAxis dataKey="day" />
            <YAxis />
            {/* <CartesianGrid strokeDasharray="3 3"/> */}
            <Tooltip />
            {/* <Legend  verticalAlign="middle" height={36}/> */}
            <Line type="natural" dataKey="daySales" stroke="#ff6e54" activeDot={{ r: 8 }} strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

}


export default SalesByDateChart;