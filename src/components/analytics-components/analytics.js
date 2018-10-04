import React, { Component } from 'react';
import Badges from './badges';

class Analytics extends Component {

  render() {
    return (
      <div className="analytics">
      <Badges
      clientList={this.props.clientList}
      />
      {/* <i className="fa fa-spinner fa-spin"></i> */}
      </div> 
    )
  }

}


export default Analytics;