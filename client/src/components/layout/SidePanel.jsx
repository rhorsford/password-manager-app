import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "./layout.scss";

class SidePanel extends Component {

  render() {
    const linkPath = [
      {
        url: "/dashboard",
        name: "Home"
      },
      {
        url: "/email",
        name: "Email Password"
      },
      {
        url: "/dashboard",
        name: "General Password"
      },
      {
        url: "/dashboard",
        name: "Internet Password"
      },
      {
        url: "/dashboard",
        name: "Homebanking Password"
      },
      {
        url: "/dashboard",
        name: "Other Password"
      }
    ];

    return (
        <div className="col-3 p-4">
          <h2>Control Panel</h2>
          <ul>
            {linkPath.map(link => {
              return (
                  <li key={link}>
                    <NavLink to={link.url} activeClassName="active">
                      {link.name}
                    </NavLink>
                  </li>
              )
            })}
          </ul>
        </div>
    );
  }
}

export default SidePanel;