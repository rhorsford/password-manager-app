import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
        <div className="container valign-wrapper">
          <div className="row v-align">
            <div className="panel col-6 p-4">
              <div className="col-12">
                <h1>
                  Login
                </h1>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
              <div className="col-8 offset-2 ">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                  />

                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                  />

                </div>
                <div className="input-field">
                  <button
                      type="submit"
                      className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </form>
                <Link to="/" className="btn-flat waves-effect">
                  Back to home
                </Link>
            </div>
            </div>
          </div>
        </div>
    );
  }
}
export default Login;