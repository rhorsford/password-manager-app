import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.scss";
class Navbar extends Component {
  render() {
    return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper">
              <Link
                  to="/"
                  style={{
                    fontFamily: "monospace"
                  }}
                  className="col s5"
              >
                MERN
              </Link>
            </div>
          </nav>
        </div>
    );
  }
}
export default Navbar;