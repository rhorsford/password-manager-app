import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "./UserPanel";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;

    const passwordType = ["Total", "Email", "General", "Internet", "Homebanking", "Other"];

    return (

        <div className="dashboard container v-align">
          <div className="row panel">
              <SidePanel />
            <div className="col-9">
              <UserPanel />
              <div className="row m-0 p-4">
                {passwordType.map(i => {
                  return (
                  <div className="col-4 metrics" key={i.toString()}>
                    <h3 className="underline">{i} Password</h3>
                      <span className="statistics">
                      0
                      </span>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);