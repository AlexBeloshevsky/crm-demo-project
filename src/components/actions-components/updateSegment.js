import React, { Component } from 'react';

class UpdateSegment extends Component {

  constructor() {
    super();
    this.state = {
      currentClient: {},
      emailOption: "",
      newOwner: ""
    }
  }

  changeClient = (event) => {
    let newState = { ...this.state };
    newState.currentClient = this.props.clientList.find(x => x.name === event.target.value);
    this.setState(newState);
  }

  declareSale = () => {
      this.props.declareSale(this.state.currentClient)
    }

  selectEmailOption = (event) => {
    let newState = { ...this.state };
    newState.emailOption = event.target.value;
    // console.log(newState.emailOption)
    this.setState(newState);
  }

  sendEmailToClient = () => {
    if (this.state.emailOption === "" || this.state.currentClient == {}) {
      alert("please select a client and an email option");
    } else {
      this.props.sendEmailToClient(this.state.currentClient, this.state.emailOption)
    }
  }

  selectNewOwner = (event) => {
    let newState = { ...this.state };
    newState.newOwner = event.target.value;
    // console.log(newState.newOwner);
    this.setState(newState);
  }

  changeClientOwner = () => {
    if (this.state.newOwner === "") {
      alert("please select a client and an owner");
    } else {
      this.props.changeClientOwner(this.state.currentClient, this.state.newOwner)
    }
  }

  render() {
    return (
      <div className="updateDiv">
        <h3>
          UPDATE
        </h3>
        <p><span>Client: </span><input type="text" list="data" onChange={this.changeClient}></input></p>
        <p><span>Transfer ownership to: </span><input type="text" list="owners" onChange={this.selectNewOwner}></input><button onClick={this.changeClientOwner}>TRANSFER</button></p>
        <p><span>Send email: </span><input type="text" list="emails" onChange={this.selectEmailOption}></input><button onClick={this.sendEmailToClient}>SEND</button></p>
        <p><span>Declare sale!</span><button className="declareButton" onClick={this.declareSale}>DECLARE</button></p>
        <hr></hr>
        <datalist id="data">
          {this.props.clientList.map((item) =>
            <option value={item.name} />
          )}
        </datalist>
        <datalist id="owners">
          {this.props.ownerList.map((item) =>
            <option value={item} />
          )}
        </datalist>
        <datalist id="emails">
          <option value="A" />
          <option value="B" />
          <option value="C" />
          <option value="D" />
        </datalist>
      </div>
    )
  }

}


export default UpdateSegment;