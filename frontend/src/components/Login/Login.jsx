import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import './Login.css';


const styled = {
    button: {
        color: 'white',
        background: '#CC4E46',
        fontSize: '16px',

    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            status: false,
            correct: false,
        }
    };

    InputValueLogin(value) {
        this.setState({
            login: value,
        })
    };

    InputValuePassword(value) {
        this.setState({
            password: value,
        })
    };

    buttonPush = async () => {
        if (this.state.login && this.state.password
        ) {
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
            if (data.id) {
                sessionStorage.user = data.id;
                sessionStorage.name = data.login;
                this.setState({
                    login: '',
                    password: '',
                });
                window.location.reload();

                this.props.history.push(`main`);
            } else {
                this.setState({
                    status: true,
                    login: '',
                    password: '',
                });
            }
        } else {
            this.setState({
                correct: true,
                login: '',
                password: '',
            });
        }
    }

    render() {
        return (
            <>
                <p className='teg'></p>
                <div className="ui form container1">
                    <div className="field ui right icon input">
                        <input placeholder='Введите логин' onChange={event => this.InputValueLogin(event.target.value)}
                               value={this.state.login}>
                        </input>
                        <i className="icon user outline"></i>
                    </div>
                    <div className="field ui right icon input">
                        <input type={'password'} placeholder='Введите пароль'
                               onChange={event => this.InputValuePassword(event.target.value)}
                               value={this.state.password}>
                        </input>
                        <i className="icon lock"></i>
                    </div>
                </div>
                <div className="button_div">
                    <div style={styled.button} onClick={this.buttonPush} className="ui animated button" tabIndex="0">
                        <div className="visible content">Войти</div>
                        <div className="hidden content">
                            <i className="right arrow icon"></i>
                        </div>
                    </div>
                </div>
                {sessionStorage.user && <Redirect to="/main"/>}
                {this.state.status && <div class="ui negative message div_feedback_error">
                    <div className="header">
                        Не удаётся войти. Пожалуйста, проверьте правильность написания логина и пароля.
                    </div>
                </div>}
                {this.state.correct && <div class="ui negative message div_feedback_error">
                    <div className="header">
                        Перед отправкой заполните все поля формы
                    </div>
                </div>}

            </>
        )
    }
};

export default Login;

