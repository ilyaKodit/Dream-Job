import React, {Component} from 'react';
import {connect} from 'react-redux';
import CompanyPage from "../CompanyPage/CompanyPage";
import {Redirect} from "react-router-dom";
import Registration from "../Registration/Registration";

const styled = {
    button: {
        color: 'white',
        background: '#CC4E46',
        fontSize: '16px',

    }
};

class AccessCheck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            key: ''
        }
    }

    buttonPush = async () => {

        let resp = await fetch('/key',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: this.state.key
            })
        });
        let data = await resp.json();

        if (data.status){
            sessionStorage.keyUser = this.state.key;
            this.props.history.push(`/registration`);
        }

    };

    onChange = (event) => {
        this.setState({
            key: event.target.value
        });
    };


    render() {
        return (
            <div>

                <p className='teg'></p>
                <div className="ui form container1">
                    <div className="field ui right icon input">
                        <input placeholder='Введите ключ' onChange={this.onChange} value={this.state.key} >
                        </input>
                        <i className="icon key"></i>
                    </div>
                </div>
                <div className="button_div">
                    <div style={styled.button} onClick={this.buttonPush} className="ui animated button" tabIndex="0">
                        <div className="visible content">Ввести ключ</div>
                        <div className="hidden content">
                            <i className="right arrow icon"></i>
                        </div>
                    </div>
                </div>

                {sessionStorage.keyUser && <Redirect to={'/registration'}/>}

            </div>
        );
    }
}

export default connect()(AccessCheck);
