import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";
import PageHeading from "../layout/PageHeading";
import Popup from "../popup/Popup";
import PropTypes from "prop-types";

class Email extends Component {

  constructor(props){
    super(props);
    this.state = { showPopup: false };
  }

  onShowPopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
    document.body.classList.toggle("popup-bg");
  };

  render() {
    const PassTable = ["Title", "type", "url", "password", "date"];
    const emailList = "email-list";
    const emailHead = "Email Passwords";

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
                <tr>
                <td>
                  test cotent
                </td>
                 <td>
                  test cotent
                </td>
                 <td>
                  test cotent
                </td>
                 <td>
                  test cotent
                </td>
                 <td>
                  test cotent
                </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-12 details">
              <button className="btn btn-blue" onClick={this.onShowPopup}><i className="fi-xwsuxl-plus-solid"></i> Add new Login</button>
            </div>
          </div>
        </div>
      </div>
      {this.state.showPopup ?
          <Popup
              text='Click "Close Button" to hide popup'
              closePopup={this.onShowPopup.bind(this)}
          />
          : null
      }
    </div>
  );
  }
}
Email.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Email);