import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import './Registration.css'
import { withTheme } from 'styled-components';


const styled = {
  button: {
    color: 'white',
    background: '#CC4E46',
    fontSize: '16px',
    
  }
};

class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      pass: '',
      pass2: '',
      email: ''
    }
  }

  onChangeGlobal = (name) => (event) => {
    const newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  };

  registration = async (event) => {

    if (this.state.pass === this.state.pass2) {

      let resp = await fetch(
        '/reg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: this.state.login,
            pass: this.state.pass,
            email: this.state.email
          })
        }

      );
      let data = await resp.json();
      console.log(data);
      sessionStorage.name = data.login;
      sessionStorage.user = data._id;
      console.log(sessionStorage.user);

      this.setState({
        login: '',
        pass: '',
        pass2: '',
        email: ''
      });

      window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <p className='teg'></p>
        <div className="ui form container1">
        <div className="field ui right icon input">
          <input required onChange={this.onChangeGlobal('login')} type="text" placeholder={'Введите логин'} value={this.state.login} />
          <i className="icon user outline"></i>
          </div>
          <div className="field ui right icon input">
          <input onChange={this.onChangeGlobal('email')} type="text" placeholder={'Введите почту'} value={this.state.email} />
          <i className="icon envelope outline"></i>
          </div>
          <div className="field ui right icon input">
          <input required onChange={this.onChangeGlobal('pass')} type="text" placeholder={'Введите пароль'} value={this.state.pass} />
          <i className="icon lock"></i>
          </div>
          <div className="field ui right icon input">
          <input required onChange={this.onChangeGlobal('pass2')} type="text" placeholder={'Введите пароль еще раз'} value={this.state.pass2} />
          <i className="icon lock"></i>
          </div>
          </div>
          <div className="button_div">
          <div style={styled.button} onClick={this.registration} className="ui animated button" tabindex="0">
            <div className="visible content">Войти</div>
            <div className="hidden content">
            <i className="right arrow icon"></i>
          </div>
          </div>
          </div>
        {sessionStorage.user && <Redirect to="/main" />}

      </div>

    );
  }
}

export default connect()(Registration)


