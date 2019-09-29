import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "./UserPanel";
import PageHeading from "../layout/PageHeading";
import PasswordCounter from "./subtemplate/PasswordCounter";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: {
        total: "total",
        email: "email",
        general: "general",
        internet: "internet",
        homebanking: "homebanking",
        other: "other",
      }
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const {user} = this.props.auth;
    const dashHead = "Dashboard";
    const dashList = 'dash-list';
    console.log(user);

    return (

        <div className="dashboard container v-align">
          <div className="row panel set-height">
            <SidePanel list={dashList}/>
            <div className="col-9">
              <UserPanel/>
              <PageHeading heading={dashHead}/>
              <div className="row m-0 p-4">
                <PasswordCounter type={this.state.type.total} user={this.props.auth}/>
                <PasswordCounter type={this.state.type.email}/>
                <PasswordCounter type={this.state.type.general}/>
                <PasswordCounter type={this.state.type.internet}/>
                <PasswordCounter type={this.state.type.homebanking}/>
                <PasswordCounter type={this.state.type.other}/>
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
    {logoutUser}
)(Dashboard);