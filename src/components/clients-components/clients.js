import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import Modal from 'react-responsive-modal'; 

class Clients extends Component {

  constructor() {
    super();
    this.state = {
      modalOpen: false,
      clickedClient: ""
    }
  }

  updateFirstName = (event) => {
    let newState = {...this.state};
    newState.clickedClient.row.firstName = event.target.value;
    this.setState(newState);
  }

  updateLastName = (event) => {
    let newState = {...this.state};
    newState.clickedClient.row.lastName = event.target.value;
    this.setState(newState);
  }

  updateCountry = (event) => {
    let newState = {...this.state};
    newState.clickedClient.row.country = event.target.value;
    this.setState(newState);
  }

  onOpenModal = (info) => {
    this.setState({ 
      modalOpen: true,
      clickedClient: info
    });
  };
 
  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  updateClient = () => {
    this.props.updateClient(this.state.clickedClient);
    this.setState({ modalOpen: false });
  }

  getTable = () => {
    let rawData = this.props.clientList
    let data = rawData.map( item => {
      item.firstName = item.name.split(' ').slice(0, -1).join(' ');
      item.lastName = item.name.split(' ').slice(-1).join(' ');
      let longDate = new Date(item.firstContact);
      item.shortDate = longDate.toLocaleDateString();
      return item;
    })
    const columns = [{
      Header: ' Name',
      accessor: 'firstName',
      filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["firstName"] }),
    filterAll: true // String-based value accessors!
    }, {
      Header: 'Surname',
      accessor: 'lastName',
      filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["lastName"] }),
    filterAll: true,
      Cell: props => <span>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Country',
      accessor: 'country',
      filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["country"] }),
    filterAll: true,
      Cell: props => <span>{props.value}</span> // Custom cell components!
    }, {
      Header: 'First Contact',
      accessor: 'shortDate',
      Cell: props => <span>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Email',
      accessor: 'emailType',
      filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["emailType"] }),
    filterAll: true,
      Cell: props => <span>{props.value ? (props.value) : ("-")}</span> // Custom cell components!
    }, {
      Header: 'Sold',
      accessor: 'sold',
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        if (filter.value === "true") {
          return row.sold === true;
        }
        return row.sold === false;
      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="true">Sale made</option>
          <option value="false">Sale not made</option>
        </select>,
      Cell: props => <span>{props.value ? (<span>&#x2713;</span>) : ("-")}</span> // Custom cell components!
    }, {
      Header: 'Owner',
      accessor: 'owner',
      filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["owner"] }),
    filterAll: true,
      Cell: props => <span>{props.value}</span> // Custom cell components!
    }, 
    ]
    return (
  <ReactTable
  filterable
  defaultFilterMethod={(filter, row) =>
    String(row[filter.id]) === filter.value}
    data={data}
    columns={columns}
    getTdProps={(state, rowInfo, column, instance) => {
      return {
        onClick: (e, handleOriginal) => {
          {this.onOpenModal(rowInfo)}
          // console.log("It was in this row:", rowInfo);
          if (handleOriginal) {
            handleOriginal();
          }
        }
      };
    }}
  />
    )
  }

  getModal = () => {
    let { modalOpen } = this.state;
    return (
      <Modal open={modalOpen} onClose={this.onCloseModal} center>
      {this.state.clickedClient.row ? (
        <div>
      <h3>Name: <span>{this.state.clickedClient.row.firstName}</span></h3>
      <h3>Update Name to: <input type="text" value={this.state.clickedClient.row.firstName} name="firstName" onChange={this.updateFirstName}></input></h3>
      <h3>Surname: <span>{this.state.clickedClient.row.lastName}</span></h3>
      <h3>Update Surname to: <input type="text" value={this.state.clickedClient.row.lastName} name="lastName" onChange={this.updateLastName}></input></h3>
      <h3>Country: <span>{this.state.clickedClient.row.country}</span></h3>
      <h3>Update Country to: <input type="text" value={this.state.clickedClient.row.country} name="country" onChange={this.updateCountry}></input></h3>
      <button className="modalButton" onClick={this.updateClient}>Update</button>
      </div>
      ) : "" }
    </Modal>
    )
  } 

render() {

  
  return (
    <div>
  {this.getModal()}
  {this.getTable()}
  </div>
  )
}
}

export default Clients;