import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div className={'nav'}>
        <Link className={'nav_item'} to={'/'}>Home</Link>
        {sessionStorage.user && <Link className={'nav_item'} to={'/main'}>Companies</Link>}
        {sessionStorage.user && <Link onClick={this.logout} to={'/'} className={'nav_item'}>Logout</Link>}
        {!sessionStorage.user && <Link className={'nav_item'} to={'/login'}>Log In</Link>}
        {!sessionStorage.user && <Link className={'nav_item'} to={'/registration'}>Registration</Link>}
      </div>
    );
  }
}
export default connect()(Navbar);











