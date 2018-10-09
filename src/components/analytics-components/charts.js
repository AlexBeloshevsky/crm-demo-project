import React, { Component } from 'react';
import TopEmployeesChart from './topEmployeesChart';
import SalesByCountryChart from './salesByCountry';
import SalesByDateChart from './salesByDate';
import ClientAcquisitionPieChart from  './ClientAcquisitionPieChart';

class Charts extends Component {

  constructor() {
    super();
    this.state = {
      topEmployees: [],
      salesByCountry: [],
      salesByDate: []
    }
  }

  createTopEmployeesData = (data) => {
    let newState = { ...this.state.topEmployees };
    var sld, itm, a = [], L = data.length, o = {};
    for (var i = 0; i < L; i++) {
      itm = data[i].owner;
      sld = data[i].sold;
      if (!itm || !sld) continue;
      if (o[itm] == undefined) o[itm] = 1;
      else ++o[itm];
    }
    for (var p in o) a[a.length] = { item: p, sales: o[p] };
    a.sort(function (a, b) {
      return o[b.item] - o[a.item];
    });
    newState = a.slice(0, 3);
    // console.log(newState.topEmployees);
    this.setState({ topEmployees: newState });
  }

  createSalesByCountryData = (data) => {
    let newState = { ...this.state.salesByCountry };
    // console.log(this.state)
    var sld, itm, a = [], L = data.length, o = {};
    for (var i = 0; i < L; i++) {
      itm = data[i].country;
      sld = data[i].sold;
      if (!itm || !sld) continue;
      if (o[itm] == undefined) o[itm] = 1;
      else ++o[itm];
    }
    for (var p in o) a[a.length] = { item: p, frequency: o[p] };
    // a.sort(function(a, b){
    //     return o[b.item]-o[a.item];
    // });
    newState = a;
    this.setState({ salesByCountry: newState });
  }

  createSalesInLastThirtyDaysData = (data) => {
    let resultArray = [];
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    for (let i = 0; i < 30; i++) {
      let day = new Date(year, month, date - i);
      // console.log(day);
      let daySales = 0;
      for (let j = 0; j < data.length; j++) {
        let clientTime = new Date(data[j].firstContact);
        if (clientTime.getFullYear() === day.getFullYear() && clientTime.getMonth() === day.getMonth() && clientTime.getDate() === day.getDate()) {
          daySales = daySales + 1;
        }
      }
      let result = {
        day, daySales
      }
      resultArray.push(result);
    }
    this.setState({ salesByDate: resultArray})
    // console.log(resultArray);
  }

    createChartData = () => {
      let data = this.props.clientList;
      this.createTopEmployeesData(data);
      this.createSalesByCountryData(data);
      this.createSalesInLastThirtyDaysData(data);
    }


    componentDidUpdate(prevProps) {
      if (this.props.clientList !== prevProps.clientList) {
        this.createChartData();
      }
    }

    componentDidMount(){
      if (this.props.clientList.length !== 0) {
      this.createChartData();
      };
    }

    render() {
      return (
        <div className="charts">
          <TopEmployeesChart
            topEmployees={this.state.topEmployees}
          />
          <SalesByCountryChart
            salesByCountry={this.state.salesByCountry}
          />
          <SalesByDateChart
            salesByDate={this.state.salesByDate}
          />
          <ClientAcquisitionPieChart/>
        </div>
      )
    }

  }


  export default Charts;