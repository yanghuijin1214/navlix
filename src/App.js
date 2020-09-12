import React from "react";
import "./App.css";
import Login from "./components/Login";
import { HashRouter, Route } from "react-router-dom";
import Movie_App from "./movie_app/Movie_App";
class App extends React.Component {
  render() {
    window.location.href = "/#/login";
    return (
      <HashRouter>
        <Route path="/login" component={Login} />
        <Route path="/movie" component={Movie_App} />
      </HashRouter>
    );
  }
}

export default App;
