import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PageHeading from "../layout/PageHeading";
import EditForm from "./form/EditForm";
import NewForm from "./form/NewForm";

import validateRecordInput from "../../../../validation/userPassword";
import axios from "axios";
import {GET_ERRORS} from "../../actions/types";


class Popup extends Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.state = {
      id: "",
      name: "",
      title: "",
      type: "",
      editPass: "edit",
      newPass: "new",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.editRecord !== this.props.editRecord) {
      this.setState({editRecord: nextProps.editRecord});
    }

  }

  handleStateChange(e, value) {
    e.preventDefault();
    let updateRecord = this.state.updateRecord;
    updateRecord.length = 0;
    updateRecord.push(value);
    this.setState({updateRecord: updateRecord})
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.password !== this.state.password) {
      this.setState({password: this.state.password})
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
    e.target.value.length > 0 ?
        e.target.closest("div").classList.add("show-pass")
        :
        e.target.closest("div").classList.remove("show-pass")
  };

  deleteTask = e => {
    const errors = this.state.errors;
    const updatedErrors = Object.keys(errors).filter(error => error.e !== e);
    this.setState({errors: updatedErrors});

  };

  passwordShow = (e) => {
    console.log(e.target);
    const target = e.target.closest("div");
    const sibling = target.children;

    if (sibling[2].type === "password") {
      sibling[2].type = "text";
    } else {
      sibling[2].type = "password";
    }
  };

  randomstring = (L) => {
    var s = '';
    var randomchar = function () {
      var n = Math.floor(Math.random() * 62);
      if (n < 10) return n; //1-10
      if (n < 36) return String.fromCharCode(n + 55); //A-Z
      return String.fromCharCode(n + 61); //a-z
    };
    while (s.length < L) s += randomchar();
    return s;
  };

  newRecordSubmit = (passEndpoint, e) => {
    const newRecord = {
      id: this.randomstring(5),
      name: this.props.user.name,
      title: this.state.title,
      type: this.props.passType,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      url: this.state.url,
      comments: this.state.comments,
    };

    console.log(newRecord);

    let errors = validateRecordInput(newRecord).errors;
    validateRecordInput(newRecord);

    if (validateRecordInput(newRecord).isValid === false) {
      this.setState({errors: errors})
    } else {
      axios
          .post("/api/records/" + passEndpoint, newRecord)
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

  existingRecordSubmit = (e) => {
    console.log("fired");
    const {updateRecord} = this.state;

    console.log(updateRecord);
    console.log(updateRecord[0]);
    console.log(updateRecord[0].title);
    axios
        .put("/api/records/update/" + updateRecord[0].id, updateRecord[0])
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

  };


  onSubmit = (e) => {
    this.setState({edit: false});

    e.preventDefault();
    let passEndpoint = this.props.passType;

      this.state.editRecord && this.state.editRecord.length ? this.existingRecordSubmit(e) : this.newRecordSubmit(passEndpoint, e);


  };

  render() {

    const {editRecord, editPass, newPass} = this.state;
    return (

        <div className='popup p-4'>
          <a href="#" className="closebtn" onClick={this.props.closePopup}></a>
          {editRecord && editRecord.length ?
              <PageHeading type={editPass}/>
              :
              <PageHeading type={newPass}/>}

          <div className='row'>
            <div className='col-12'>
              {editRecord && editRecord.length ?
                  <EditForm
                      user={this.props.user.name}
                      passType={this.props.passType}
                      change={this.onChange.bind(this)}
                      handleStateChange={this.handleStateChange}
                      onSubmit={this.onSubmit.bind(this)}
                      passwordShow={this.passwordShow.bind(this)}
                      errors={this.state.errors}
                      editRecord={this.state.editRecord}
                  />
                  :
                  <NewForm
                      onSubmit={this.onSubmit.bind(this)}
                      change={this.onChange.bind(this)}
                      passwordShow={this.passwordShow.bind(this)}
                      passwordLengthChecker={this.state.password}
                      errors={this.state.errors}
                  />
              }
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

