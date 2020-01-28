import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import FAQ from '../FAQ/FAQ';
import Team from '../Team/Team';
import AddCompanyPage from '../AddCompany/AddCompanyPage';
import Feedback from '../Feedback/Feedback';
import MainPage from '../MainPage/MainPage';
import CompanyInfo from '../CompanyInfo/CompanyInfo';
import Error from '../Error/Error';
import { connect } from 'react-redux';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';


class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Router>
          <header>
            <Navbar/>
          </header>

          <Main/>

          <Footer/>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
