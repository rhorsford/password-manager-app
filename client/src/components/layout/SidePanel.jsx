import React, {Component} from "react";
import Nav from "./../nav/Nav";
import "./layout.scss";

class SidePanel extends Component {

  render() {

    return (
        <div className="col-3 p-4">
          <h2>Control Panel</h2>
            <Nav />
        </div>
    );
  }
}

export default SidePanel;