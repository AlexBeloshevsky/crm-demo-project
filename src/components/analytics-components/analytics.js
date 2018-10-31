import React, { Component } from 'react';
import Badges from './badges';
import Charts from './charts';

class Analytics extends Component {

  render() {
    return (
      <div className="analytics">
      <Badges
      clientList={this.props.clientList}
      />
      <Charts
      clientList={this.props.clientList}
      />
      </div> 
    )
  }

}


export default Analytics;