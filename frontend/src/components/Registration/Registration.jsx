import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

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

        if (this.state.pass === this.state.pass2){
            console.log('test');
            let resp = await fetch(
                '/reg',
                {
                    method: 'POST',
                    headers:  {
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

            sessionStorage.user = data;

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
                <h2>Registration</h2>
                <input required onChange={this.onChangeGlobal('login')} type="text" placeholder={'Введите логин'} value={this.state.login}/>
                <br/>
                <input onChange={this.onChangeGlobal('email')} type="text" placeholder={'Введите почту'} value={this.state.email}/>
                <br/>
                <input required onChange={this.onChangeGlobal('pass')} type="text" placeholder={'Введите пароль'} value={this.state.pass}/>
                <br/>
                <input required onChange={this.onChangeGlobal('pass2')} type="text" placeholder={'Введите пароль еще раз'} value={this.state.pass2}/>
                <br/>
                <input onClick={this.registration} type="submit" value={'Зарегистрироваться'}/>

                {sessionStorage.user && <Redirect to="/"/>}
            </div>
        );
    }
}

export default connect()(Registration)
