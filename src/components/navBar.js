import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <div id="navBar">
      <Link to="/">Clients</Link>
      <Link to="/actions">Actions</Link>
      <Link to="/analytics">Analytics</Link>
      </div> 
    )
  }

}


export default NavBar;