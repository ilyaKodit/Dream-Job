import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import './Navbar.css';

setInterval(() => {
    document.querySelector('.logoName').style.left = `${ (document.querySelector('body').clientWidth / 2) - 95}px`
}, 40);



class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    logout = () => {
        sessionStorage.clear();
        window.location.reload();
    };

    render() {
        return (
            <div className={'nav'}>

                <div>
                    <Link className={'nav_item'} to={'/'}>Home</Link>
                    {sessionStorage.user && <Link className={'nav_item'} to={'/main'}>Companies</Link>}
                    {sessionStorage.user === '5e3312905fdb3b46083ffdd9' && <Link className={'nav_item'} to={'/admin'}>Add key</Link>}
                </div>
                <div className={'logoName'}>
                    Dream Job
                </div>
                <div>
                    {sessionStorage.user && <span className={'userName'}>{sessionStorage.name}</span>}
                    {sessionStorage.user && <Link onClick={this.logout} to={'/'} className={'nav_item'}>Logout</Link>}
                    {!sessionStorage.user && <Link className={'nav_item'} to={'/login'}>Sign In</Link>}
                    {!sessionStorage.user && <Link className={'nav_item'} to={'/accessCheck'}>Sign Up</Link>}
                </div>

            </div>
        );
    }
}

export default connect()(Navbar);











