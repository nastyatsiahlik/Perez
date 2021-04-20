import logo from "./logo.svg";
import "./App.css";
import React from "react";
import WeeklyScheduler from "./components/WeeklyScheduler";
import PhotoWeather from "components/PhotoWeather";
import DayWeather from "components/DayWeather";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import moment from "moment";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/timetable">Highlights weather</Link>
            </li>
            <li>
              <Link to="/highlights">Weekly weather</Link>
            </li>
            <li>
              <Link to="/day">Hour weather</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className="App">
          <section>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/timetable/:id">
                <PhotoWeather />
              </Route>
              <Route path="/timetable">
                <Redirect to={`/timetable/${moment().format("YYYY-MM-DD")}`} />
              </Route>

              <Route path="/highlights">
                <WeeklyScheduler />
              </Route>
              <Route path="/day">
                <DayWeather />
              </Route>

              <Route path="/">
                <h1>Welcome to weather center</h1>
                <p>
                  {" "}
                  Our service will help you find out the weather for a week by clicking on the link{" "} 
                  <Link to="/highlights">weather</Link> on week, or{" "}, 
                  for a day <Link to="/day">hour weather</Link>
                  or see the best weather photos <Link to="/timetable">highlights weather</Link>
                  <h3>Enjoy using!</h3>
                </p>
              </Route>

              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </section>
        </div>
      </div>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function About() {
  let location = useLocation();

  return (
    <div>
      <h2>About us</h2>
      <p>
      We cooperate with many geomerological stations, so we ourselves have the most reliable sources.<p>We assure that you will not be overtaken by problems with weather conditions if you rely on our forecasts!</p>
      </p>
    </div>
  );
}

export default App;
