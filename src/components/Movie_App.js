import React from "react";
import { Route } from "react-router-dom";
import Movie from "./Movie";
class Movie_App extends React.Component {
  render() {
    return <Route path="/movie" exact={true} component={Movie} />;
  }
}
export default Movie_App;
