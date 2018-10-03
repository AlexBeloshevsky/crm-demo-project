import React, { Component } from 'react';
import UpdateSegment from './updateSegment';
import AddClientSegment from './addClientSegment';



class Actions extends Component {

  render() {
    return (
      <div className="actions">
      <UpdateSegment
      clientList={this.props.clientList}
      ownerList={this.props.ownerList}
      declareSale={this.props.declareSale}
      sendEmailToClient={this.props.sendEmailToClient}
      changeClientOwner={this.props.changeClientOwner}
      />
      <AddClientSegment
      addClient={this.props.addClient}
      />
      </div> 
    )
  }

}


export default Actions;