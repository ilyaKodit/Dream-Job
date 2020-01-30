import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const styles = {
    button: {
        background: '#CC4E46',
        color: 'white',
        fontSize: '16px',
    },
    input: {
        textAlign: 'center'
    },
    group1: {
        display: 'flex',
        justifyContent: 'center',
    },
    group2: {
        width: '200px',
        height: '300px',
        backgroundColor: '#F3F3F3',
        margin: '50px auto 0 auto',
        padding: '10px',
        overflowY: 'scroll',
        position: 'relative'
    },
    text: {
        fontSize: '18px',
        textAlign: 'center',
        color: '#282828'
    },
    icon: {
        fontSize: '50px',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto',
        color: '#878787'

    }
};


class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '',
            list: []
        }
    }

    onChange = (event) => {

        if (+event.target.value > 40) {
            return false;
        }

        this.setState({
            input: event.target.value,
            list: this.state.list
        });
    };

    onClick = async (event) => {

        let resp = await fetch('/createKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num: +this.state.input
            })
        });
        let data = await resp.json();

        let allList = this.state.list.concat(data.keys);

        if (data.keys.length) {
            this.setState({
                input: '',
                list: allList
            })
        }
    };

    render() {
        return (
            <div>

                <div style={styles.group1}>
                    <div style={styles.input} className="ui input focus">
                        <input type="number" min={0} max={40} onChange={this.onChange} value={this.state.input}/>
                    </div>
                    <div to={'/add/employer/'} onClick={this.onClick} className="ui animated button"
                         style={styles.button} tabIndex="0">
                        <div className="visible content">Create</div>
                        <div className="hidden content">
                            <i className="right key icon"></i>
                        </div>
                    </div>
                </div>

                <div style={styles.group2}>
                    {
                        this.state.list.length ?

                            this.state.list.map((key, index) => {
                                return (
                                    <div key={index}>
                                        <div className="ui middle aligned selection list">
                                            <div className="item">
                                                <div className="content">
                                                    <div style={styles.text} className="header">{key}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            : <i style={styles.icon} className="key icon"></i>
                    }
                </div>

                {sessionStorage.user !== '5e3312905fdb3b46083ffdd9' && <Redirect to={'/'}/>}
            </div>

        );
    }
}

export default connect()(Admin)
