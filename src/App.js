import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import { SyncLoader } from 'react-spinners';
import NavBar from "./components/navBar";
import Clients from './components/clients-components/clients';
import Actions from './components/actions-components/actions';
import Analytics from './components/analytics-components/analytics';

const override ='';

class App extends Component {

  constructor() {
    super();
    this.state = {
      clients: [],
      owners:[],
      loading: true
    }
  }

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  nowDate = () => {
    let date = new Date();
    return date;
  }

  updateClient = (info) => {
    let newState = {...this.state};
    // console.log(this.state.clients.find(x => x._id === info.original._id));
    let newClient = newState.clients.find(x => x._id === info.original._id);
    newClient.country = info.row.country;
    newClient.name = `${info.row.firstName} ${info.row.lastName}`;
    this.setState(newState);
  }

  addClient = (data) => {
    let newState = {...this.state};
    let newClient = {
      _id: this.guid(),
      name: `${data.firstName} ${data.lastName}`,
      email: "",
      firstContact: this.nowDate(),
      emailType: "",
      sold: false,
      owner: data.owner,
      country: data.country 
    }
    newState.clients.push(newClient);
    this.setState(newState);
    console.log(this.state);
  }

  declareSale = (client) => {
    let newState = {...this.state};
    let clientToChange = newState.clients.find(x => x._id === client._id);
    clientToChange.sold = true;
    this.setState(newState);
  }

  sendEmailToClient = (client, emailOption) => {
    let newState = {...this.state};
    let clientToChange = newState.clients.find(x => x._id === client._id);
    clientToChange.emailType = emailOption;
    this.setState(newState);
  }

  changeClientOwner = (client, owner) => {
    let newState = {...this.state};
    let clientToChange = newState.clients.find(x => x._id === client._id);
    clientToChange.owner = owner;
    this.setState(newState);
  }

  componentDidMount() {
    setTimeout(() => {
      let data = require('./data.json');
      let newState = { ...this.state };
      newState.clients = data;
      newState.owners = [...new Set(data.map(c => c.owner))]; 
      newState.loading = false;
      this.setState(newState);
    }, 100)
  }

  render() {
    let loadingBoolean = this.state.loading;
    return (
      <Router>
        <div className="App">
          <NavBar />
           {loadingBoolean ? (
             <div className="myLoaderCSS">
             <SyncLoader
               className={override}
               sizeUnit={"px"}
               size={50}
               color={'#36D7B7'}
               loading={this.state.loading}
             />
             </div>
           ) : ""} 
          <Route path="/" exact
            render={() =>
              <Redirect to="/clients" />}
          />
          <Route path="/clients" exact
            render={() =>
              <Clients 
              clientList={this.state.clients}
              updateClient={this.updateClient}
              />}
          />
          <Route path="/actions" exact
            render={() =>
              <Actions
              addClient={this.addClient}
              clientList={this.state.clients}
              ownerList={this.state.owners}
              declareSale={this.declareSale}
              sendEmailToClient={this.sendEmailToClient}
              changeClientOwner={this.changeClientOwner}
              />}
          />
          <Route path="/analytics" exact
            render={() =>
              <Analytics />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
