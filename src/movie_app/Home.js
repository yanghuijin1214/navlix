import React from "react";
import axios from "axios";
import HomeSelected from "./HomeSelected";
import Search from "./Search";
import SearchedPage from "./SearchedPage";
class Home extends React.Component {
  state = {
    isLoading: true,
    results: [],
    total_pages: 1,
  };
  movies = [];
  genres = [];
  objList = [];
  selectedGenre = [];
  searchValue = [];
  NP_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US";
  GR_URL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US";

  createOption = () => {
    const select = document.getElementById("select");
    select.className = "genre_select";
    if (!select.firstChild) {
      const option = document.createElement("option");
      option.innerText = "== 선택 ==";
      select.appendChild(option);
      for (let i = 0; i < this.objList.length; i++) {
        const option = document.createElement("option");
        option.innerText = `${this.objList[i].genre}`;
        select.appendChild(option);
      }
    }
  };
  getMovie = async () => {
    const getTotalPages = await axios.get(`${this.NP_URL}&page=1`);
    const getGenres = await axios.get(this.GR_URL);
    const { total_pages } = getTotalPages.data;
    const { genres } = getGenres.data;

    for (let i = 1; i <= total_pages; i++) {
      const getTotalPages = await axios.get(`${this.NP_URL}&page=${i}`);
      this.movies.push(getTotalPages);
    }

    for (let j = 0; j < genres.length; j++) {
      let genre = genres[j].name;
      this.objList.push({ genre, movie: [] });
      for (let i = 0; i < this.movies.length; i++) {
        this.movies[i].data.results.map((dish) => {
          for (let k = 0; k < dish.genre_ids.length; k++) {
            if (
              dish.genre_ids[k] === genres[j].id &&
              dish.poster_path !== null
            ) {
              this.objList[j].movie.push(dish);
            }
          }
        });
      }
    }

    for (let i = 0; i < this.objList.length; i++) {
      if (this.objList[i].movie.length === 0) {
        this.objList.splice(i, 1);
      }
    }
    this.setState({ isLoading: false });
    this.createOption();
  };
  componentDidMount() {
    this.getMovie();
  }
  render() {
    const { isLoading } = this.state;
    return (
      <div className="genresPage">
        <Search
          onChangePage={(value) => {
            this.searchValue = [];
            this.movies.map((dish) =>
              dish.data.results.map((dish) => {
                if (value) {
                  if (dish.original_title.includes(value)) {
                    this.searchValue.push(dish);
                  }
                }
              })
            );
            this.setState({ isLoading: false });
          }}
        />
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="genreWrap">
            <select
              name=""
              id="select"
              onChange={
                ("change",
                (e) => {
                  e.preventDefault();
                  for (let i = 0; i < this.objList.length; i++) {
                    if (e.target.value === this.objList[i].genre) {
                      this.selectedGenre = [this.objList[i]];
                      this.setState({ isLoading: false });
                    } else if (e.target.value === "== 선택 ==") {
                      this.selectedGenre = [];
                      this.setState({ isLoading: false });
                    }
                  }
                })
              }
            ></select>

            {this.searchValue.length ? (
              <div className="contentsWrap">
                {this.searchValue.map((dish) => (
                  <SearchedPage dish={dish} />
                ))}
              </div>
            ) : this.selectedGenre.length ? (
              this.selectedGenre.map((dish) => <HomeSelected objlist={dish} />)
            ) : (
              this.objList.map((dish) => <HomeSelected objlist={dish} />)
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Home;
