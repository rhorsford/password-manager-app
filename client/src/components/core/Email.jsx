import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";

class Email extends Component {


  render() {
    return (
    <div className="dashboard container v-align">
      <div className="row panel">
        <SidePanel />
        <div className="col-9">
          <UserPanel />
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