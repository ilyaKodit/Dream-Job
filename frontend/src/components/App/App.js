import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Registration from "../Registration/Registration";
import FAQ from '../FAQ/FAQ';
import Team from '../Team/Team';
import Navbar from '../Navbar/Navbar';
import AddCompanyPage from '../AddCompany/AddCompanyPage';
import Feedback from "../Feedback/Feedback";
import MainPage from "../MainPage/MainPage";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import Error from "../Error/Error";
import {connect} from 'react-redux';
import Footer from '../Footer/Footer';


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <header>
                            <Navbar/>
                        </header>

                        {/*<hr/>*/}
                        <Switch>

                            <Route exact path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/faq" component={FAQ}/>
                            <Route path="/team" component={Team}/>
                            <Route path="/main" component={MainPage}/>
                            <Route path="/company/:id" component={CompanyInfo}/>
                            <Route path='/add/employer/:id?' component={AddCompanyPage}/>
                            <Route path="/feedback/:id" component={Feedback}/>
                            <Route component={Error}/>

                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default connect()(App)
