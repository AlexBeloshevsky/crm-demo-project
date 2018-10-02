import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div id="navBar">
      <NavLink to="/clients" activeClassName="selectedTab">Clients</NavLink>
      <NavLink to="/actions" activeClassName="selectedTab">Actions</NavLink>
      <NavLink to="/analytics" activeClassName="selectedTab">Analytics</NavLink>
      </div> 
    )
  }

}


export default NavBar;