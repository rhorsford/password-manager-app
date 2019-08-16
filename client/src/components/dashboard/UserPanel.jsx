import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class UserPanel extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;

    return (

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
    );
  }
}
UserPanel.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(UserPanel);