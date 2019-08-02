import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./auth.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {errors} = this.state;
    return (
        <div className="container valign-wrapper">
          <div className="login row v-align">
            <div className="panel col-6 p-4">
              <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i> Back to
                  home
                </Link>
                <div className="col s12">
                  <h4>
                    <b>Register</b> below
                  </h4>
                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <span className="red-text">{errors.name}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("", {
                          invalid: errors.name
                        })}
                    />
                  </div>

                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <span className="red-text">{errors.email}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                          invalid: errors.password
                        })}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <span className="red-text">{errors.password}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password
                        })}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password2">Confirm Password</label>
                    <span className="red-text">{errors.password2}</span>
                    <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password2
                        })}
                    />

                  </div>
                  <div className="input-field">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));

// export default Register;
