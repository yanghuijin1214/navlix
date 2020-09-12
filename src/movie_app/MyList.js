import React from "react";
class MyList extends React.Component {
  state = {
    title: true,
  };
  MYLIST = "mylist";
  objlist = [];
  localLoad = () => {
    this.objlist = JSON.parse(localStorage.getItem(this.MYLIST));
    if (this.objlist === null) {
      this.objlist = [];
    }
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
  render() {
    this.localLoad();
    console.log(this.objlist);
    return (
      <>
        <h1 className="latest_title">내가 찜한 콘텐츠</h1>
        <div className="contentsWrap">
          {this.objlist.map((content) => (
            <div className="content">
              <img
                src={`http://i2.wp.com/image.tmdb.org/t/p/w780/${content.poster_path}`}
                alt={content.original_title}
                className="imgsrc"
              />
              {content.original_title}
              <i
                class="fas fa-heart"
                name={content.original_title}
                onClick={() => {
                  this.localRemove(content);
                  this.setState({ title: false });
                }}
              ></i>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default MyList;
