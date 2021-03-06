import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import FAQ from '../FAQ/FAQ';
import Team from '../Team/Team';
import AddCompanyPage from '../AddCompany/AddCompanyPage';
import Feedback from '../Feedback/Feedback';
import MainPage from '../MainPage/MainPage';
import CompanyInfo from '../CompanyInfo/CompanyInfo';
import AccessCheck from "../AccessCheck/AccessCheck";
import Admin from "../Admin/Admin";
import Error from '../Error/Error';
import {connect} from 'react-redux';

class Main extends Component {

  render() {
    return (
        <main>
          <Switch>

            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Route path="/accessCheck" component={AccessCheck}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/faq" component={FAQ}/>
            <Route path="/team" component={Team}/>
            <Route path="/main" component={MainPage}/>
            <Route path="/company/:id" component={CompanyInfo}/>
            <Route path='/add/employer/:id?' component={AddCompanyPage}/>
            <Route path="/feedback/:id" component={Feedback}/>
            <Route component={Error}/>

          </Switch>
        </main>

    );
  }

}

export default connect()(Main)
