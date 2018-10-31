import React, { Component } from 'react';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SalesByCountryChart extends Component {

  render() {
    let data = this.props.salesByCountry;
    // console.log(this.props.salesByCountry)
    return (
      <div>
        <h3>Sales By Country</h3>
        <ResponsiveContainer width="100%">
          <BarChart className="chart" width={600} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="frequency" fill="#955196" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

}


export default SalesByCountryChart;