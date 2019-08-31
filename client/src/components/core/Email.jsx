import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";
import PageHeading from "../layout/PageHeading";
import Popup from "../popup/Popup";
import PropTypes from "prop-types";
import {getEmailUserPassword} from "../../actions/userPasswords"

class Email extends Component {

  constructor(props){
    super(props);
    this.state = { showPopup: false,
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
      valid: false
    };
  }

  componentDidMount() {
    this.getPassword();
  };

  getPassword =()=> {
    const { user } = this.props.auth;
    fetch('/api/records/email/' + user.name)
        .then((data) => data.json())
        .then((res) => this.setState({ records: res.data, isLoading: false }));

};


  onShowPopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
    document.body.classList.toggle("popup-bg");
  };

  editRecord = e => {
    console.log(e.target);
  };

  removeRecord = e => {
    console.log(e.target);
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
                            const{name, title, type, password, url, date} = record;
                            return (
                                <tr key={name+ '-'+index}>
                                  <td>{title}</td>
                                  <td>{type}</td>
                                  <td><span>{password}</span></td>
                                  <td>{url}</td>
                                  <td>{date}</td>
                                  <td>
                                    <span onClick={this.editRecord}>
                                      <i className="fas fa-edit"></i>
                                    </span>
                                    <span onClick={this.removeRecord}>
                                      <i className="fas fa-trash"></i>
                                    </span>
                                  </td>
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
              passType = { this.state.type }
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