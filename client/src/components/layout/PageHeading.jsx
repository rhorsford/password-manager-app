import React, {Component} from "react";
import "./layout.scss";

class PageHeading extends Component {


  render() {
    return (
        <div className="row">
          <div className="col-12 heading">
            {(() => {
              switch(this.props.type) {
                case 'dashboard':
                  return <h2>Dashboard</h2>;
                case 'email':
                  return <h2>Email Passwords</h2>;
                case 'general':
                  return <h2>General Passwords</h2>;
                case 'internet':
                  return <h2>Internet Passwords</h2>;
                case 'home-banking':
                  return <h2>Home banking Passwords</h2>;
                case 'other':
                  return <h2>Other Passwords</h2>;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
    );
  }
}
export default PageHeading