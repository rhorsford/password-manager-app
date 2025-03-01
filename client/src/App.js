import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/authActions";

import './App.scss';


import {Provider} from "react-redux";
import store from "./store";


// import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import PasswordScreen from "./components/core/PasswordScreen";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      general: "general",
      internet: 'internet',
      homebanking: "homebanking",
      other: "other"
    };
  }

  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className="App">
              {/*<Navbar/>*/}
              <Route exact path="/" component={Landing}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/email" component={PasswordScreen} key="email"/>
                <PrivateRoute exact path="/general" component={PasswordScreen} key="general"/>
                <PrivateRoute exact path="/internet" component={PasswordScreen} key="internet"/>
                <PrivateRoute exact path="/home-banking" component={PasswordScreen} key="homebanking"/>
                <PrivateRoute exact path="/other" component={PasswordScreen} key="other"/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
