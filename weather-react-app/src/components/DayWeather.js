import React from "react";
import * as Api from "typescript-fetch-api";
import { withRouter } from "react-router";
import moment from "moment";
import Moment from "react-moment";

const api = new Api.DefaultApi();

class DayWeather extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match?.params.id || moment().format("YYYY-MM-DD");
    console.log(id);
    this.state = {
      weathers: [],
      targetDate: id,
    };
    this.handleReload = this.handleReload.bind(this);
    this.handleReload();
  }

  async handleReload(weather) {
    const response = await api.weathers({
      date: this.state.targetDate,
    });
    this.setState({ weathers: response });
  }

  render() {
    return (
      <div>
        {/* <button onClick={this.handleReload}>Reload</button> */}
        <h2>Hourly weather</h2>
        <h3>on day</h3>
        <table align="center">
      <tr>
        <table width="100px" align="left">
          <tr>1 a.m :</tr>
          <tr>4 a.m:</tr>
          <tr>7 a.m:</tr>
          <tr>10 a.m:</tr>
          <tr>1 p.m:</tr>
          <tr>4 p.m:</tr>
          <tr>7 p.m:</tr>
        </table>
      
        <table>
          {this.state.weathers.map((weather) => (
          <tr 
            key={weather.id}>
            {weather.temperature}°C
          </tr>
          ))}
        </table>
      </tr>
    </table>
      </div>
    );
  }
}

export default withRouter(DayWeather);
