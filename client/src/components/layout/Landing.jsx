import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./layout.scss";
import logo from '../../logo.svg';

class Landing extends Component {
  render() {
    return (
        <div className="container valign-wrapper">
          <div className="login row v-align">
            <div className="panel col-6 p-4">
              <div className="img-container">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <h1>
                Password Manager App
              </h1>
              <p>
                In order to use please register otherwise, click the <span className="bold">Login</span> button
              </p>
              <div className="col">
                <Link
                    to="/register"
                    className="btn btn-primary"
                >
                  Register
                </Link>
                <Link
                    to="/login"
                    className="btn btn-primary"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Landing;