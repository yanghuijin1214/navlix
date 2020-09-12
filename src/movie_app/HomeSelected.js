import React from "react";

class HomeSelected extends React.Component {
  state = {
    loading: false,
  };
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
    const { objlist } = this.props;
    return (
      <div>
        <h1>{objlist.genre}</h1>
        <div className="forBtn">
          <button
            className="left btn"
            onClick={
              ("click",
              (e) => {
                e.preventDefault();
                e.target.nextSibling.scrollLeft -= 300;
              })
            }
          >
            &lt;
          </button>
          <div className="genre">
            {objlist.movie.map((content) =>
              content.poster_path ? (
                <div name={content.original_title} className="genre_contents">
                  <img
                    src={`http://i2.wp.com/image.tmdb.org/t/p/w780/${content.poster_path}`}
                    name={content.original_title}
                    alt={content.original_title}
                    className="imgsrc"
                  />
                  {content.original_title}

                  <i
                    class={this.localGet(content)}
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
              ) : null
            )}
          </div>
          <button
            className="right btn"
            onClick={
              ("click",
              (e) => {
                e.preventDefault();
                e.target.previousSibling.scrollLeft += 300;
                console.dir(e.target.previousSibling);
              })
            }
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }
}

export default HomeSelected;
