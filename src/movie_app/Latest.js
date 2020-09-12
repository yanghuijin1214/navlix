import React from "react";
import axios from "axios";
import Search from "./Search";
import SearchedPage from "./SearchedPage";

class Latest extends React.Component {
  state = {
    isLoading: true,
    results: [],
    total_pages: 1,
    pages: 1,
  };
  MYLIST = "mylist";
  NP_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=72892f68da9d9b2d2cef54e7fa2b8bc8&language=en-US";
  ContentsEA = 30;
  movies = [];
  latestMovies = [];
  pageMovies = [];
  searchValue = [];

  createLi = (total_pages) => {
    const ul = document.querySelector("#ul");
    if (!ul.firstChild) {
      for (let i = 1; i <= total_pages; i++) {
        const li = document.createElement("li");
        li.innerText = `${i}`;

        li.addEventListener("click", (e) => {
          this.pageMovies = [];

          for (var j = 0; j < this.ContentsEA; j++) {
            var now = this.latestMovies[
              this.ContentsEA * (Number(e.target.innerText) - 1) + j
            ];

            if (now) {
              this.pageMovies[j] = now;
            }
          }
          this.setState({ pages: 2 });
        });
        ul.appendChild(li);
      }
    }
  };

  getMovie = async () => {
    const getTotalPages = await axios.get(`${this.NP_URL}&page=1`);
    const { total_pages } = getTotalPages.data;

    for (let i = 1; i <= total_pages; i++) {
      const getTotalPages = await axios.get(`${this.NP_URL}&page=${i}`);
      this.movies.push(getTotalPages);
    }

    for (let j = 0; j < this.movies.length; j++) {
      const latestFilter = this.movies[j].data.results.filter(
        (dish) =>
          dish.release_date.match("2020-08") && dish.poster_path !== null
      );
      this.latestMovies.push(...latestFilter);
    }
    var total = Math.ceil(this.latestMovies.length / this.ContentsEA);

    for (var j = 0; j < this.ContentsEA; j++) {
      if (this.latestMovies[j]) {
        this.pageMovies[j] = this.latestMovies[j];
      }
    }
    this.createLi(total);
    this.setState({ total_pages, isLoading: false });
  };
  localSet = (dish) => {
    const mylist = [];
    const ML_item = JSON.parse(localStorage.getItem(this.MYLIST)); //원래 있던 거
    if (ML_item !== null) {
      mylist.push(...ML_item);
    }
    mylist.push(dish);
    localStorage.setItem(this.MYLIST, JSON.stringify(mylist));
    return mylist;
  };
  localRemove = (dish) => {
    let mylist = [];
    const ML_item = JSON.parse(localStorage.getItem(this.MYLIST)); //원래 있던 거
    if (ML_item) {
      mylist.push(...ML_item);
    }
    mylist = mylist.filter(
      (zzim) => zzim.original_title !== dish.original_title
    );
    localStorage.setItem(this.MYLIST, JSON.stringify(mylist));
    return mylist;
  };
  localGet = (content) => {
    const ML_item = JSON.parse(localStorage.getItem(this.MYLIST));
    if (ML_item) {
      for (let i = 0; i < ML_item.length; i++) {
        if (ML_item[i].original_title === content.original_title) {
          return "fas fa-heart";
        }
      }
    }
    return "far fa-heart";
  };
  componentDidMount() {
    this.getMovie();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="movieLatest">
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
        ) : this.searchValue.length ? (
          <div className="contentsWrap">
            {this.searchValue.map((dish) => (
              <SearchedPage dish={dish} />
            ))}
          </div>
        ) : (
          <>
            <h1 className="latest_title">최신 콘텐츠</h1>
            <div className="contentsWrap">
              {this.pageMovies.map((content) => (
                <div className="contentWrap">
                  <div className="content">
                    <img
                      src={`http://i2.wp.com/image.tmdb.org/t/p/w780/${content.poster_path}`}
                      alt={content.poster_path}
                      className="imgsrc"
                    />
                    <p>{content.original_title}</p>
                    <i
                      class={this.localGet(content)} //far 빈하트 fas 찬하트
                      name={content.original_title}
                      onClick={(e) => {
                        if (e.target.className === "far fa-heart") {
                          e.target.className = "fas fa-heart";
                          this.localSet(content);
                        } else {
                          this.localRemove(content);
                          e.target.className = "far fa-heart";
                        }
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="pageNum">
          <ul
            id="ul"
            style={{
              display: this.searchValue.length ? "none" : "block",
            }}
          ></ul>
        </div>
      </div>
    );
  }
}
export default Latest;
