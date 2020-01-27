import React, { Component } from 'react';

import './Login.css';

// import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // login: '',
      email: '',
      password: '',
    };
  }

  /* InputValueLogin(value) {
    console.log(value);
    this.setState({
      login: value,
    });
  }

  InputValuePassword(value) {
    console.log(value);
    this.setState({
      password: value,
    });
  }

  buttonPush = async () => {
    let resp = await fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      }),
    });
    let data = await resp.json();
    // console.log(data);
    sessionStorage.user = data.id;
    sessionStorage.name = data.login;
    console.log(sessionStorage.user);
    this.setState({
      login: '',
      password: '',
    });
    window.location.reload();
  }; */

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.onSubmit}>
          <h1>Login Below!</h1>
          <input
            // type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            // type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;

// <>
//   <div
//     style={{ margin: 10 }}>
//     <input
//       placeholder='enter login'
//       onChange={event => this.InputValueLogin(event.target.value)}
//       value={this.state.login} >
//     </input>
//   </div>
//   <input style={{ margin: 10 }}
//     placeholder='enter password'
//     onChange={event => this.InputValuePassword(event.target.value)}
//     value={this.state.password} >
//   </input>
//   <button onClick={this.buttonPush}>PUSH</button>

//   {sessionStorage.user && <Redirect to="/main"/>}

// </>
