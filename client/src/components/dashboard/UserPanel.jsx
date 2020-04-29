import React, { Component ,useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Nav from "../nav/Nav";

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNav: false,
      openLoginNav: false,
    };
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  clickEvent = e => {
    e.preventDefault();
    if((!this.state.openNav === true) && (!this.state.openLoginNav === true)) {
      this.setState({[e.target.id]: true});
    } else {
      this.setState({[e.target.id]: false});
    }
  };

  render() {
    const { user } = this.props.auth;

    return (
        <nav className="user-details">
          <div className="dropdown nav">
            <a id="openNav" className="dropbtn" href="#" onClick={e => this.clickEvent(e)}>
              <i className={this.state.openNav === true ? "fas fa-times" : "fas fa-bars"}></i>
            </a>
            <div className={this.state.openNav === true ? "dropdown-content open" : "dropdown-content"}>
              <Nav />
            </div>
          </div>
          <div className="dropdown">
            <a id="openLoginNav" className="dropbtn" href="#" onClick={e => this.clickEvent(e)}>{user.name.split(" ")[0]}
              <i className={this.state.openLoginNav === true ? "fas fa-caret-up" : "fas fa-caret-down"}></i>

            </a>
            <div className={this.state.openLoginNav === true ? "dropdown-content open" : "dropdown-content"}>
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