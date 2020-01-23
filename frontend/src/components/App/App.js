import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

// import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Registration from "../Registration/Registration";
import FAQ from '../FAQ/FAQ';
import Team from '../Team/Team';


function App() {
  return (
    <Router>
      <div>
        <ul id="page-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/registration"><Registration /></Route>

          

          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/team">
            <Team />
          </Route>

        </Switch>
        <footer id="footer">
          <ul id="horizontal-list">
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
          </ul>

          <hr />

          {/* <Switch></Switch> */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
