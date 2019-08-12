import React, {Component} from "react";
import "./layout.scss";

class PageHeading extends Component {


  render() {
    return (
        <div className="row">
          <div className="col-12 heading">
            <h2>{this.props.heading}</h2>
          </div>
        </div>
    );
  }
}
export default PageHeading