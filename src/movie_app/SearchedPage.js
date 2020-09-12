import React from "react";

class SearchedPage extends React.Component {
  MYLIST = "mylist";
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
  render() {
    const { dish } = this.props;
    return (
      <div className="contentWrap">
        {dish.poster_path ? (
          <div className="content">
            <img
              src={`http://i2.wp.com/image.tmdb.org/t/p/w780/${this.props.dish.poster_path}`}
              alt={this.props.dish.poster_path}
              className="imgsrc"
            />
            <p>{this.props.dish.original_title}</p>
            <i
              class={this.localGet(dish)}
              name={dish.original_title}
              onClick={(e) => {
                if (e.target.className === "far fa-heart") {
                  e.target.className = "fas fa-heart";
                  this.localSet(dish);
                } else {
                  this.localRemove(dish);
                  e.target.className = "far fa-heart";
                }
              }}
            ></i>
          </div>
        ) : null}
      </div>
    );
  }
}
export default SearchedPage;
