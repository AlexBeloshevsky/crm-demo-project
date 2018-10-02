import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import matchSorter from 'match-sorter'; 

class Clients extends Component {

render() {
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
  />
  )
}
}

export default Clients;