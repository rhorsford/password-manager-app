import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "./layout.scss";

class SidePanel extends Component {

  componentDidMount() {
    this.onActive();
  }

  onActive = () => {
    const activeLink = document.querySelector(".active");
    let parent = activeLink.parentElement;
    parent.classList.add("active");
  };

  render() {
    let index = 0;
    const linkPath = [
      {
        icon: "fas fa-home",
        url: "/dashboard",
        name: "Home"
      },
      {
        icon: "fas fa-envelope",
        url: "/email",
        name: "Email Password"
      },
      {
        icon: "fas fa-user-cog",
        url: "/general",
        name: "General Password"
      },
      {
        icon: "fas fa-globe",
        url: "/internet",
        name: "Internet Password"
      },
      {
        icon: "fas fa-money-check-alt",
        url: "/home-banking",
        name: "Homebanking Password"
      },
      {
        icon: "fas fa-wallet",
        url: "/other",
        name: "Other Password"
      }
    ];

    return (
        <div className="col-3 p-4">
          <h2>Control Panel</h2>
          <ul>
            {linkPath.map(link => {
              ++index;
              return (
                  <li key={this.props.list + '-' + index}>
                    <div className="icon">
                      <i className={link.icon}></i>
                    </div>
                    <NavLink to={link.url} activeClassName="active" onClick={e => this.onActive(e)}>
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