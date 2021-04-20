import React from "react";
import * as Api from "typescript-fetch-api";
import { withRouter } from "react-router";
import moment from "moment";
import Moment from "react-moment";

const api = new Api.DefaultApi();

class PhotoWeather extends React.Component {
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
        <h2>Our favorite weather</h2>
        <h3>
          Weather on{" "}
          <Moment format="YYYY/MM/DD">{this.state.targetDate}</Moment>{" "}
        </h3>
        <ul>
          {this.state.weathers.map((weather) => (
            <div key={weather.id}>
              {weather.image} at the address {weather.location}
              {weather.temperature} °C

               {weather.date}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(PhotoWeather);
