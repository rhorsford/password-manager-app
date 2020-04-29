import React, {Component} from "react";
import Chart from 'react-apexcharts';

class StatisticsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        labels: ['Email', 'General', 'Internet', 'Home', 'Other']
      },
      series: [0, 0, 0, 0, 0],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.emailData !== this.props.emailData) {
      let series = [...this.state.series];
      series[0] = this.props.emailData;
      series[1] = this.props.generalData;
      series[2] = this.props.internetData;
      series[3] = this.props.homebankingData;
      series[4] = this.props.otherData;

      this.setState({series});
    }
  };


  render() {
    return (
        <div className="col-6 metrics chart">
          <h2 className="underline">Statistics</h2>
          <div className="Chart">
            <Chart options={this.state.options} series={this.state.series} type="donut" width="75%"/>
          </div>
        </div>
    )
  }
}

export default StatisticsChart;