import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";
import PageHeading from "../layout/PageHeading";
import Popup from "../popup/popup";

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
  };

  render() {
    const PassTable = ["Title", "type", "url", "password", "date"];
    const emailList = "email-list";
    const emailHead = "Email Passwords";

    return (
    <div className="dashboard container v-align">
      <div className="row panel">
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
          {this.state.showPopup ?
              <Popup
                  text='Click "Close Button" to hide popup'
                  closePopup={this.onShowPopup.bind(this)}
              />
              : null
          }
        </div>
      </div>
    </div>
  );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Email);