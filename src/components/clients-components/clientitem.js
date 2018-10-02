import React, { Component } from 'react';

class ClientItem extends Component {

  render() {

    let firstName = this.props.singleClient.name.split(' ').slice(0, -1).join(' ');
    let lastName = this.props.singleClient.name.split(' ').slice(-1).join(' ');
    let date = new Date(this.props.singleClient.firstContact)
    let localDate = date.toLocaleDateString();
    return (
      <div>
      {firstName}
      {lastName}
      {this.props.singleClient.country}
      {localDate}
      {this.props.singleClient.emailType}
      {this.props.singleClient.sold ? "true" : "false"}
      {this.props.singleClient.owner}
      </div> 
    )
  }

}


export default ClientItem;