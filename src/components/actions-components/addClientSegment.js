import React, { Component } from 'react';

class AddClientSegment extends Component {

  constructor() {
    super();
    this.state = {
      newClient: {
        firstName: "",
        lastName: "",
        country: "",
        Owner: ""
      }
    }
  }

  changeFirstName = (event) => {
    let newState = {...this.state};
    newState.newClient.firstName = event.target.value
    this.setState(newState);
  }

  changeLastName = (event) => {
    let newState = {...this.state};
    newState.newClient.lastName = event.target.value
    this.setState(newState);
  }

  changeCountry = (event) => {
    let newState = {...this.state};
    newState.newClient.country = event.target.value
    this.setState(newState);
  }

  changeOwner = (event) => {
    let newState = {...this.state};
    newState.newClient.Owner = event.target.value
    this.setState(newState);
  }


  
  addClient = () => {
    this.props.addClient(this.state.newClient)
  }

  render() {
    return (
      <div>
        <h3>ADD CLIENT</h3>
        <p><span>First Name: </span><input type="text" onChange={this.changeFirstName}></input></p>
        <p><span>Surname: </span><input type="text" onChange={this.changeLastName}></input></p>
        <p><span>Country: </span><input type="text" onChange={this.changeCountry}></input></p>
        <p><span>Owner: </span><input type="text" onChange={this.changeOwner}></input></p>
        <button className="yellowButton" onClick={this.addClient}>Add New Client</button>
      </div> 
    )
  }

}


export default AddClientSegment;