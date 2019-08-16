import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "./UserPanel";
import PageHeading from "../layout/PageHeading";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const dashHead = "Dashboard";
    const dashList = 'dash-list';
    const passwordType = ["Total", "Email", "General", "Internet", "Homebanking", "Other"];

    return (

        <div className="dashboard container v-align">
          <div className="row panel set-height">
              <SidePanel list={dashList} />
            <div className="col-9">
              <UserPanel />
              <PageHeading heading={dashHead} />
              <div className="row m-0 p-4">
                {passwordType.map(i => {
                  return (
                  <div className="col-4 metrics" key={'metric-'+i.toString()}>
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