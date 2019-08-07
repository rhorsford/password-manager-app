import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from "react-router-dom";

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
            <div className="col-3 p-4">
              <h2>Control Panel</h2>
              <ul>
                <li>
                  <Link to="/">
                    Home</Link>
                </li>
                <li>
                  <Link to="/">
                    Email Password</Link>
                </li>
                <li>
                  <Link to="/">
                    General Password</Link>
                </li>
                <li>
                  <Link to="/">
                    Internet Password</Link>
                </li>
                <li>
                  <Link to="/">
                    Homebanking Password</Link>
                </li>
                <li>
                  <Link to="/">
                    Other Password</Link>
                </li>
              </ul>
            </div>
            <div className="col-9">
              <nav className="user-details">
                <div className="dropdown">
                  <a className="dropbtn" href="#">{user.name.split(" ")[0]}
                    <i className="fi-xwsdxl-caret-solid"></i>
                </a>
                  <div className="dropdown-content">
                    <a
                        onClick={this.onLogoutClick}
                        className="btn"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </nav>
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