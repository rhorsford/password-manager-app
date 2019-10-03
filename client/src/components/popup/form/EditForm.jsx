import React, {Component,  useEffect } from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import validateUserDetailsInput from "../../../../../validation/userPassword";


class editForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      editName: "",
      title: "",
      editType: "",
      password: "",
      confirm_password: "",
      url: "",
      comments: "",
      edit: props.edit,
      editRecord: [],
      updateRecord: [],
      errors: {}
    };
  }

  componentDidMount() {
    this.showEditDetails();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onUpdate = e => {
    this.setState({[e.target.id]: e.target.value});
    e.target.value.length > 0 ?
        e.target.closest("div").classList.add("show-pass")
        :
        e.target.closest("div").classList.remove("show-pass")
  };

  showEditDetails = () => {
    let _this = this;
    this.props.editRecord.map(record => {
      const {id, name, title, type, password, confirm_password, url, comments} = record;

      _this.setState({
        id: id,
        title: title,
        password: password,
        confirm_password: confirm_password,
        url: url,
        comments: comments
      });

    });

  };


  onSubmit = (e) => {

    e.preventDefault();
    const updateRecord = {
      id: this.state.id,
      name: this.props.user,
      title: this.state.title,
      type: this.props.passType,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      url: this.state.url,
      comments: this.state.comments,
    };

    console.log(this.state.password);

    console.log(updateRecord);

    let errors = validateUserDetailsInput(updateRecord).errors;
    validateUserDetailsInput(updateRecord);
    if (validateUserDetailsInput(updateRecord).isValid === false) {
      this.setState({errors: errors})
    } else {
      this.props.handleStateChange(e, updateRecord);
      this.props.onSubmit(e);
    }
  };

  render() {

    const {errors} = this.state;

    return (
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <span className="red-text">
                  {errors.title}
                  </span>
            <input
                onChange={this.onUpdate}
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
                onChange={this.onUpdate}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="confirm_password">Confirm Password</label>
            <span className="red-text">
                  {errors.confirm_password}
                  </span>
            <input
                onChange={this.onUpdate}
                value={this.state.confirm_password}
                error={errors.confirm_password}
                id="confirm_password"
                type="password"
                className={classnames("", {
                  invalid: errors.confirm_password
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="url">URL</label>

            <input
                onChange={this.onUpdate}
                value={this.state.url}
                id="url"
                type="text"
            />
          </div>

          <div className="input-field">
            <label htmlFor="comments">Comments</label>
            <textarea
                onChange={this.onUpdate}
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
              Update Details
            </button>
          </div>

        </form>

    );
  }
}

editForm.propTypes = {
  validateUserDetailsInput: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
    mapStateToProps,
    {validateUserDetailsInput}
)(withRouter(editForm));

