import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './App.css';
import NavBar from "./components/navBar";
import Clients from './components/clients-components/clients';
import Actions from './components/actions-components/actions';
import Analytics from './components/analytics-components/analytics';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route path="/" exact
            render={() =>
              <Redirect to="/clients" />}
          />
          <Route path="/clients" exact
            render={() =>
              <Clients />}
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
