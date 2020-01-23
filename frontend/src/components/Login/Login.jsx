import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
  };

  InputValueLogin(value) {
    console.log(value);
    this.setState({
      login: value,
    })
  };

  InputValuePassword(value) {
    console.log(value);
    this.setState({
      password: value,
    })
  };

  buttonPush = async () => {
    let resp = await fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password,
      })
    });
    let data = await resp.json();
    console.log(data);  
  };

  render() {
    return (
      <>
        <div
          style={{ margin: 10 }}>
          <input
            placeholder='enter login'
            onChange={event => this.InputValueLogin(event.target.value)}
            value={this.state.login} >
          </input>
        </div>
        <input style={{ margin: 10 }}
          placeholder='enter password'
          onChange={event => this.InputValuePassword(event.target.value)}
          value={this.state.password} >
        </input>
        <button onClick={this.buttonPush}>PUSH</button>
      </>
    )
  }
};

export default Login;

