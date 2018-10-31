import React, { Component } from 'react';

class Badge extends Component {

  createClassName = () => {
    return `fa  fa-4x ${this.props.icon}`
  }

  render() {
    return (
      <div className="badgeDiv">
      <i className={this.createClassName()}></i>
      <h1>{this.props.header}</h1>
      <p>{this.props.text}</p>
      </div> 
    )
  }

}


export default Badge;