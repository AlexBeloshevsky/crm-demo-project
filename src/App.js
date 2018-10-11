import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import { SyncLoader } from 'react-spinners';
import NavBar from "./components/navBar";
import Clients from './components/clients-components/clients';
import Actions from './components/actions-components/actions';
import Analytics from './components/analytics-components/analytics';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Axios from 'axios';

const override = '';

class App extends Component {

  constructor() {
    super();
    this.state = {
      clients: [],
      owners: [],
      loading: true
    }
  }

  // guid = () => {
  //   function s4() {
  //     return Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1);
  //   }
  //   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  // }

  nowDate = () => {
    let date = new Date();
    return date;
  }

  updateClient = (info) => {
    console.log(info);
    // let newState = { ...this.state };
    // console.log(info.original._id);
    // // console.log(this.state.clients.find(x => x._id === info.original._id));
    // let newClient = newState.clients.find(x => x._id === info.original._id);
    // newClient.country = info.row.country;
    // newClient.name = `${info.row.firstName} ${info.row.lastName}`;
    // this.setState(newState);
    let clientID = info.original._id;
    Axios.post('http://localhost:8080/clients/' + clientID, info)
    .then((data)=> {
      console.log(info);
      this.getData()
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  changeClientDataFromActionsTab = (info) => {
    // console.log(info);
    let clientID = info._id;
    Axios.post('http://localhost:8080/actions/' + clientID, info)
    .then((data)=> {
      this.getData()
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  addClient = (data) => {
    let newClient = {
      name: `${data.firstName} ${data.lastName}`,
      firstContact: this.nowDate(),
      owner: data.owner,
      country: data.country
    }
    Axios.post('http://localhost:8080/actions', newClient)
      .then((data) => {
        // console.log(data);
        this.getData();
      })
      .catch((err) => {
        alert("Oops!!");
        console.log('Error:something wrong happan during ajax POST request');
      });
  }

  // declareSale = (client) => {
  //   let newState = { ...this.state };
  //   let clientToChange = newState.clients.find(x => x._id === client._id);
  //   clientToChange.sold = true;
  //   this.setState(newState);
  // }

  // sendEmailToClient = (client, emailOption) => {
  //   let newState = { ...this.state };
  //   let clientToChange = newState.clients.find(x => x._id === client._id);
  //   clientToChange.emailType = emailOption;
  //   this.setState(newState);
  // }

  // changeClientOwner = (client, owner) => {
  //   let newState = { ...this.state };
  //   let clientToChange = newState.clients.find(x => x._id === client._id);
  //   clientToChange.owner = owner;
  //   this.setState(newState);
  // }

  componentDidMount() {
    this.getData();
  }

  getData() {
    Axios.get('http://localhost:8080/clients')
      .then((response) => {
        console.log(response);
        let newState = { ...this.state };
        newState.clients = response.data;
        newState.owners = [...new Set(response.data.map(c => c.owner))];
        newState.loading = false;
        this.setState(newState);
      })
      .catch(function (error) {
        console.log(error);
      });
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
                changeClientDataFromActionsTab={this.changeClientDataFromActionsTab}
              />}
          />
          <Route path="/analytics" exact
            render={() =>
              <Analytics
                clientList={this.state.clients}
                ownerList={this.state.owners}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
