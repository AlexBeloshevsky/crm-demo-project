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
      loading: true
    }
  }

  updateClient = (info) => {
    let newState = {...this.state};
    // console.log(this.state.clients.find(x => x._id === info.original._id));
    let newClient = newState.clients.find(x => x._id === info.original._id);
    newClient.country = info.row.country;
    newClient.name = `${info.row.firstName} ${info.row.lastName}`;
    this.setState(newState);
  }

  componentDidMount() {
    setTimeout(() => {
      let data = require('./data.json');
      let newState = { ...this.state };
      newState.clients = data;
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
              <Actions />}
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
