import React, { Component } from 'react';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class TopEmployeesChart extends Component {

  render() {
    let data = this.props.topEmployees;
    // console.log(this.props.topEmployees)
    return (
      <div className="chartDisplay">
        <h3>Top Employees</h3>
        <ResponsiveContainer width="100%">
          <BarChart className="chart" width={600} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" label />
            <YAxis type="category" dataKey="item" />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="sales" fill="#003f5c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

}


export default TopEmployeesChart;