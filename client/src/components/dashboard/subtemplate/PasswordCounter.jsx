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
  };

  DashboardData = () => {

    if (this.props.type === "total") {
      const {user} = this.props.user;
      console.log(user.name);
      console.log(this.props.type)
      dashboardTotalNumbers(user.name).then(data => {
        this.setState({output: data});
      });
    } else {
      dashboardNumbers(this.props.type).then(data => {
        this.setState({output: data});
      });
    }
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