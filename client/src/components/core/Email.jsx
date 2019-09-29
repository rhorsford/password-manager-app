import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";
import PageHeading from "../layout/PageHeading";
import Popup from "../popup/Popup";
import PropTypes from "prop-types";
import {editRecords, findRow, getPasswords, removeRecords} from "../stateless/Common";
import {getEmailUserPassword} from "../../actions/userPasswords"

class Email extends Component {

  constructor(props){
    super(props);
    this.state = { showPopup: false,
      id: "",
      name: "",
      title: "",
      type: "email",
      password: "",
      confirm_password: "",
      url: "",
      comments: "",
      date: "",
      errors: {},
      isLoading: true,
      records:[],
      editRecord: [],
      valid: false,
      editMode: false
    };

    this.onShowPopup = this.onShowPopup.bind(this);
  }

  componentDidMount() {
    this.getPassword();
  };

  getPassword = () => {
    const {user} = this.props.auth;
    getPasswords(this.state.type, user.name).then(data =>{
      this.setState({records: data, isLoading: false})
    });
  };

  onEditRecord = (e, user) => {
    editRecords(e, user, findRow(e)).then(data => {
      this.setState({editRecord: data})
    });
    this.onShowPopup(e);
    this.setState({editMode: true});
  };

  onShowPopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
    document.body.classList.toggle("popup-bg");
  };

  removeRecord = e => {
    removeRecords(e);
    this.getPassword();
  };

  render() {
    let index = 0;

    const { isLoading, records } = this.state;
    const PassTable = ["Title", "type", "password", "url",  "date",""];
    const emailList = "email-list";
    const emailHead = "Email Passwords";
    let{ user } = this.props.auth;
    return (
    <div className="dashboard container v-align">
      <div className="row panel set-height">
        <SidePanel list={emailList} />

        <div className="col-9">
          <UserPanel />
          <PageHeading heading={emailHead} />
          <div className="password-container">
            <table>
              <thead>
                <tr>
                  {PassTable.map(i => {
                    return (
                    <th key={'table-head-'+i}>{i}</th>

                    )
                  })}
                </tr>
              </thead>
              <tbody>
                  {!isLoading ? (
                      records.map(record => {
                        ++ index;
                            const{id, name, title, type, password, url, date} = record;
                        return (
                            <tr id={id} key={name + '-' + index}>
                              <td id="passName">{title}</td>
                              <td>{type}</td>
                              <td><span>{password}</span></td>
                              <td>{url}</td>
                              <td>{date}</td>
                              <td>
                                    <span onClick={(e) => {this.onEditRecord(e, user.name)}}>
                                      <i className="fas fa-edit"></i>
                                    </span>
                                <span onClick={this.removeRecord}>
                                      <i className="fas fa-trash"></i>
                                    </span>
                              </td>
                              <td style={{display: 'none'}}>{id}</td>
                            </tr>
                        );
                          })
                  ):(
                      <tr>
                      <td>Loading...</td>
                      </tr>
                  )}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12 details">
              <button className="btn btn-blue" onClick={this.onShowPopup}><i className="fas fa-plus"></i> Add new Login</button>
            </div>
          </div>
        </div>
      </div>
      {this.state.showPopup ?
          <Popup
              text='Click "Close Button" to hide popup'
              closePopup={this.onShowPopup.bind(this)}
              user={ user }
              updateLogin={this.getPassword.bind(this)}
              edit={this.state.editMode}
              passType={this.state.type}
              editRecord={this.state.editRecord}
          />
          : null
      }
    </div>
  );
  }
}
Email.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getEmailUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser, getEmailUserPassword }
)(Email);