import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "./UserPanel";
import PageHeading from "../layout/PageHeading";
import PasswordCounter from "./subtemplate/PasswordCounter";
import StatisticsChart from "./chart/StatisticsChart";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: {
        total: "total",
        email: "email",
        general: "general",
        internet: "internet",
        homebanking: "homebanking",
        other: "other",
      },
      chart: {
        totalData: '',
        emailData: '',
        generalData: '',
        internetData: '',
      }
    }
  }

  componentDidMount() {
    this.onChartData();
  }



  onChartData = (e) => {
    const dataArray = [];

    var regex = /(<([^>]+)>)/ig;
    var list = document.getElementById("stats");
    var items = list.querySelectorAll(".statistics");
    var s = new XMLSerializer();


    setTimeout(function() {
      items.forEach(function (item) {
        dataArray.push(item.innerText);
      });



    console.log(dataArray);
    const unsetTotal = dataArray[0];
    console.log(unsetTotal);

    const total = 5;
    const emailPass = 100/total*2;
    console.log(emailPass)
    }, 250);
  };



  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const {user} = this.props.auth;
    const dashHead = "Dashboard";
    const dashList = 'dash-list';
    console.log(user);

    return (

        <div className="dashboard container v-align">
          <div className="row panel set-height">
            <SidePanel list={dashList}/>
            <div className="col-9">
              <UserPanel/>
              <PageHeading heading={dashHead}/>
              <div id="stats" className="row m-0 p-4">
                <PasswordCounter type={this.state.type.total} user={this.props.auth} key="total"/>
                <PasswordCounter type={this.state.type.email} key="email"/>
                <PasswordCounter type={this.state.type.general}/>
                <PasswordCounter type={this.state.type.internet}/>
                <PasswordCounter type={this.state.type.homebanking}/>
                <PasswordCounter type={this.state.type.other}/>
               <StatisticsChart c/>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(Dashboard);