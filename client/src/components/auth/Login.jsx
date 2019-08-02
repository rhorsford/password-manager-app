import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";
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

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const {errors} = this.state;
    return (
        <div className="container valign-wrapper">

          <div className="row v-align">
            <div className="panel col-6 p-4">
              <div className="bg"></div>

              <div className="col-12 bg-container">

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
                    <span className="red-text">
                  {errors.email}
                      {errors.emailnotfound}
                </span>
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                          invalid: errors.email || errors.emailnotfound
                        })}
                    />

                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <span className="red-text">
                  {errors.password}
                      {errors.passwordincorrect}
                </span>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password || errors.passwordincorrect
                        })}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
    mapStateToProps,
    {loginUser}
)(withRouter(Login));