import React from "react";
import * as Api from "typescript-fetch-api";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";

const api = new Api.DefaultApi();

class WeeklyScheduler extends React.Component {
  constructor(props) {
    super(props);
    const dateParam =
      this.props.match?.params.id || moment().format("YYYY-MM-DD");
    const parsedDate = moment(dateParam, "YYYY-MM-DD");

    const nearestWeekend = parsedDate.startOf("week").isoWeekday(0);
    const endDate = moment(nearestWeekend).add(6, "day");

    const startWeek = nearestWeekend.format("YYYY-MM-DD");
    const endWeek = endDate.format("YYYY-MM-DD");

    this.state = {
      weathers: [],
      start: startWeek,
      end: endWeek,
    };

    this.handleReload = this.handleReload.bind(this);
    this.handleReload();
  }

  async handleReload(weather) {
    const response = await api.weathers({});
    this.setState({ weathers: response });
  }

  render() {
    return (
    <div>
    {/*<button onClick={this.handleReload}>Reload</button>*/}
    <h2>Weekly weather</h2>
    <h3>
    Upcoming weather from{" "}
    <Moment format="YYYY/MM/DD">{this.state.start}</Moment> to{" "}
    <Moment format="YYYY/MM/DD">{this.state.end}</Moment>{" "}
    </h3>
    <table align="left">
      <tr>
            <button class="btn" onClick={this.handleReload}>Minsk</button>
            <button class="btn" onClick={this.handleReload}>Zhodino</button>
            <button class="btn" onClick={this.handleReload}>Miory</button>
      </tr>      
    </table>

    <table align="center">
      <tr>
        <table width="100px" align="left">
          <tr><Link to="/day">Monday</Link></tr>
          <tr><Link to="/day">Tuesday</Link></tr>
          <tr><Link to="/day">Wednesday</Link></tr>
          <tr><Link to="/day">Thursday</Link></tr>
          <tr><Link to="/day">Friday</Link></tr>
          <tr><Link to="/day">Saturday</Link></tr>
          <tr><Link to="/day">Sunday</Link></tr>
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

export default withRouter(WeeklyScheduler);
