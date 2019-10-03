import React, {Component} from "react";
import Chart from 'react-apexcharts';

class StatisticsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E']
    };
  }

  componentDidMount() {

  };


  render() {
    return (
        <div className="col-6 chart metrics">
          <h2 className="underline">Statistics</h2>
          <div className="Chart">

            <Chart options={this.state.options} series={this.state.series} type="donut" width="380"/>
          </div>
        </div>
    )
  }
}

export default StatisticsChart;