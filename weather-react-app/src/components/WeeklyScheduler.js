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
          Upcoming events from{" "}
          <Moment format="YYYY/MM/DD">{this.state.start}</Moment> to{" "}
          <Moment format="YYYY/MM/DD">{this.state.end}</Moment>{" "}
        </h3>
        <div>
          <button onClick={this.handleReload}>Minsk</button>
          <button onClick={this.handleReload}>Vitebsk</button>
          <button onClick={this.handleReload}>Grodno</button>
        </div>
          {this.state.weathers.map((weather) => (
            <div key={weather.id}>
              <div>Monday: {weather.temperature}</div>
            </div>
          ))}
           {this.state.weathers.map((weather) => (
            <div key={weather.id}>
              <div>Thuesday: {weather.temperature}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default withRouter(WeeklyScheduler);
