import React from "react";
import search from "../search.png";
class Search extends React.Component {
  state = {
    isClicked: false,
  };
  render() {
    return (
      <div className="searchWrap">
        <img
          src={search}
          alt="돋보기"
          className="searchBtn"
          onClick={
            ("click",
            () => {
              this.setState({ isClicked: !this.state.isClicked });
            })
          }
        />
        <input
          type="text"
          placeholder="Search"
          className="searchText"
          onChange={
            ("change",
            (e) => {
              e.preventDefault();
              this.props.onChangePage(e.target.value);
            })
          }
          style={{ width: this.state.isClicked ? "150px" : "0" }}
        />
      </div>
    );
  }
}
export default Search;
