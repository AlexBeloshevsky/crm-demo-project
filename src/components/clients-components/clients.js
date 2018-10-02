import React, { Component } from 'react';
import SearchAndPagination from './searchandpagination';
import ClientsTableTitle from './ClientsTableTitle';
import ClientItem from './clientitem';

class Clients extends Component {

  generateClientList() {
    let clientList = this.props.clientList;
    return clientList.map(c => {
      return (<ClientItem
        key={c._id}
        singleClient={c}
        />)
    })
  }

  render() {
    return (
      <div className="clients">
      <SearchAndPagination/>
        <ClientsTableTitle/>
        {this.generateClientList()}
      </div> 
    )
  }

}


export default Clients;