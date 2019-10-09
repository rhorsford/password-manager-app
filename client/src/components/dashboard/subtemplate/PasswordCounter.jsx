import React, {Component} from "react";
import {dashboardNumbers, dashboardTotalNumbers} from "../../stateless/Common";

class PasswordCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "",
    }
  }



  componentDidMount() {
    this.DashboardData();
    // this.DashboardItems()
  };

  DashboardData = () => {
    const {user} = this.props.user;
    const that = this;
    const that_ = this;
    if (this.props.type === "total") {
      dashboardTotalNumbers(user.name).then(data => {
        this.setState({output: data});
      });
    } else {
      dashboardNumbers(user.name, this.props.type).then(data => {
        this.setState({output: data});

      });
    }
  };

  DashboardItems = () => {

  };


  render() {
    const {output} = this.state;
    return (
        <div className="col-4 metrics">
          <h3 className="underline">{this.props.type} Password</h3>
          <span className="statistics">
              {output}
                </span>
        </div>
    )
  }
}


export default PasswordCounter