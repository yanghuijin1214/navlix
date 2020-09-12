import React from "react";
import axios from "axios";
import Home from "./Home";
class Movie extends React.Component {
  state = {
    isLoading: true,
    results: [],
    total_pages: 1,
    page: 1,
  };
  article = null;
  createLi = (total_pages) => {
    const ul = document.querySelector("#ul");
    for (let i = 1; i <= total_pages; i++) {
      const li = document.createElement("li");
      li.innerText = `${i}`;
      li.addEventListener("click", (e) => {
        this.setState({ page: Number(e.target.innerText) });
        console.log(e.target);
        console.log(this.state.page);
      });
      ul.appendChild(li);
    }
    console.dir(ul);
  };
  getMovie = async () => {
    const getTotalPages = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US&page=${this.state.page}`
    );
    const { total_pages, results } = getTotalPages.data;
    console.log(total_pages);
    this.createLi(total_pages);

    this.setState({ results, total_pages, isLoading: false });
  };
  componentDidMount() {
    this.getMovie();
  }
  render() {
    const { isLoading, results } = this.state;
    return (
      <div>
        {isLoading ? (
          <div>hi</div>
        ) : (
          results.map((dish) => <Home title={dish.original_title} />)
        )}
        <ul id="ul"></ul>
      </div>
    );
  }
}
export default Movie;
