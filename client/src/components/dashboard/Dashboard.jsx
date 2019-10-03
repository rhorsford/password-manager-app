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
        homebankingData: '',
        otherData: ''
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
    var that = this;

    setTimeout(function() {

      items.forEach(function (item) {
        if (item === "NaN") {
          dataArray.push(0);
        }else {
          // dataArray.push(item.innerText);
          dataArray.push(parseInt(item.innerText));
        }
      });

    console.log(dataArray);
    const unsetTotal = dataArray[0];
    console.log(unsetTotal);

      const total = dataArray[0];
      const emailPercent = 100/total * dataArray[1];
      const generalPercent = 100/total * dataArray[2];
      const internetPercent = 100/total * dataArray[3];
      const homeBankingPercent = 100/total * dataArray[4];
      const otherPercent = 100/total * dataArray[5];

      that.setState(state => {
        state.chart.totalData = total;
        state.chart.emailData = emailPercent;
        state.chart.generalData = generalPercent;
        state.chart.internetData = internetPercent;
        state.chart.homebankingData = homeBankingPercent;
        state.chart.otherData = otherPercent;
        return state
      });

      console.log(that.state.chart.emailData);


    console.log(emailPercent);
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
               <StatisticsChart  emailData={this.state.chart.emailData}
                                 generalData={this.state.chart.generalData}
                                 internetData={this.state.chart.internetData}
                                 homebankingData={this.state.chart.homebankingData}
                                 otherData={this.state.chart.otherData}
                />

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