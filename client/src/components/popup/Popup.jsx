import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PageHeading from "../layout/PageHeading";
import classnames from "classnames";
import {userPassword, validChecker} from "../../actions/userPasswords";

import validateRecordInput from "../../../../validation/userPassword";
import {logoutUser} from "../../actions/authActions";
import axios from "axios";
import {GET_ERRORS} from "../../actions/types";


class Popup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      title: "",
      type: "",
      password: "",
      confirm_password: "",
      url: "",
      comments: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/email");
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
    const {errors} = this.state;
    this.setState({[e.target.id]: e.target.value});
    console.log(this.props.passType);
  };

  deleteTask = e => {
    const errors = this.state.errors;
    const updatedErrors = Object.keys(errors).filter(error => error.e !== e);
    this.setState({errors: updatedErrors});

  };


  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      name: this.props.user.name,
      title: this.state.title,
      type: this.props.passType,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      url: this.state.url,
      comments: this.state.comments,
    };

    let errors = validateRecordInput(newRecord).errors;
    validateRecordInput(newRecord);

    if (validateRecordInput(newRecord).isValid === false) {
      this.setState({errors: errors})
    } else {
      axios
          .post("/api/records/email", newRecord)
          .then((response) => {
            console.log(response);
            this.props.closePopup(e);
            this.props.updateLogin();
          }, (error) => {
            console.log(error);
            return {
              type: GET_ERRORS,
              payload: error.response.data
            };
          });
    }
  };

  render() {


    const {errors} = this.state;
    const popupHead = "Email Heading";
    // console.log(errors);
    // console.log(userPassword === this.isValid);
    return (
        <div className='popup p-4'>
          <a href="#" className="closebtn" onClick={this.props.closePopup}></a>
          <PageHeading heading={popupHead}/>

          <div className='row'>
            <div className='col-12'>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <span className="red-text">
                  {errors.title}
                  </span>
                  <input
                      onChange={this.onChange}
                      value={this.state.title}
                      error={errors.title}
                      id="title"
                      type="text"
                      className={classnames("", {
                        invalid: errors.title
                      })}
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                  {errors.password}
                  </span>
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
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <span className="red-text">
                  {errors.confirm_password}
                  </span>
                  <input
                      onChange={this.onChange}
                      value={this.state.confirm_password}
                      error={errors.confirm_password}
                      id="confirm_password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.confirm_password
                      })}
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="url">URL</label>
                  <input
                      onChange={this.onChange}
                      value={this.state.url}
                      id="url"
                      type="text"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="comments">Comments</label>
                  <textarea
                      onChange={this.onChange}
                      value={this.state.comments}
                      id="comments"
                      rows="4"
                      cols="50"
                  >
                  </textarea>
                </div>

                <div className="input-field">
                  <button
                      type="submit"
                      className="btn btn-primary"
                  >
                    Add Login
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
    );
  }
}

Popup.propTypes = {
  validateRecordInput: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
    mapStateToProps,
    {validateRecordInput}
)(withRouter(Popup));

