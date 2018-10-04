import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class SalesByDateChart extends Component {

  render() {
    let data = this.props.salesByDate;
    console.log(this.props.salesByDate)
      return (
        <div>
    	<LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="day"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend  verticalAlign="middle" height={36}/>
       <Line type="monotone" dataKey="daySales" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
        </div>
      );
  }

}


export default SalesByDateChart;