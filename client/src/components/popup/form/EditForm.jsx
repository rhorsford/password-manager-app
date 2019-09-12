import React, {Component} from "react";
import classnames from "classnames";
import validateRecordInput from "../../../../../validation/updateUserPassword";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";


class editForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: "",
      editTitle: "",
      editType: "",
      editPassword: "",
      editConfirm_password: "",
      editUrl: "",
      editComments: "",
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
     this.props.editRecord.map(record =>{
      const{name, title, type, password, confirm_password, url, comments} = record;

      _this.setState({ editTitle: title,
          editPassword: password,
          editConfirm_password: confirm_password,
          editUrl: url,
          editComments: comments
      });

    });

  };


  onSubmit = (e) => {

    e.preventDefault();
      const updateRecord = {
        name: this.props.user,
        title: this.state.editTitle,
        type: this.props.passType,
        password: this.state.editPassword,
        confirm_password: this.state.editConfirm_password,
        url: this.state.editUrl,
        comments: this.state.editComments,
      }

      console.log(updateRecord);

      this.props.handleStateChange(e, updateRecord);
      this.props.onSubmit(e);
  }
  //   let titleEndpoint = this.state.editTitle;
  //
  //   const newRecord = {
  //     name: this.props.user,
  //     title: this.state.editTitle,
  //     type: this.props.passType,
  //     password: this.state.editPassword,
  //     confirm_password: this.state.editConfirm_password,
  //     url: this.state.editUrl,
  //     comments: this.state.editComments,
  //   };
  //   console.log(newRecord);
  //
  //   let errors = validateRecordInput(newRecord).errors;
  //   validateRecordInput(newRecord);
  //
  //   if (validateRecordInput(newRecord).isValid === false) {
  //     this.setState({errors: errors})
  //   } else {
  //     axios
  //         .put("/api/records/update/" + titleEndpoint +'/' + this.props.user, newRecord)
  //         .then((response) => {
  //           console.log(response);
  //           // this.props.closePopup(e);
  //           // this.props.updateLogin();
  //         }, (error) => {
  //           console.log(error);
  //           return {
  //             type: GET_ERRORS,
  //             payload: error.response.data
  //           };
  //         });
  //   }
  // };




  render() {

    const {errors} = this.state;

    return (
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <span className="red-text">
                  {errors.editTitle}
                  </span>
            <input
                onChange={this.props.change}
                value={this.state.editTitle}
                error={errors.editTitle}
                id="editTitle"
                type="text"
                className={classnames("", {
                  invalid: errors.editTitle
                })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <span className="red-text">
                  {errors.editPassword}
                  </span>
            <input
                onChange={this.onUpdate}
                value={this.state.editPassword}
                error={errors.editPassword}
                id="editPassword"
                type="password"
                className={classnames("", {
                  invalid: errors.editPassword
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="confirm_password">Confirm Password</label>
            <span className="red-text">
                  {errors.editConfirm_password}
                  </span>
            <input
                onChange={this.onUpdate}
                value={this.state.editConfirm_password}
                error={errors.editConfirm_password}
                id="editConfirm_password"
                type="password"
                className={classnames("", {
                  invalid: errors.editConfirm_password
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="url">URL</label>

            <input
                onChange={this.onUpdate}
                value={this.state.editUrl}
                id="editUrl"
                type="text"
            />
          </div>

          <div className="input-field">
            <label htmlFor="comments">Comments</label>
            <textarea
                onChange={this.onUpdate}
                value={this.state.editComments}
                id="editComments"
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

export default editForm;

