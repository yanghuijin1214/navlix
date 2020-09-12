import React from "react";
import addimage1 from "../images/addimage1.png";
import addimage2 from "../images/addimage2.png";
import addimage3 from "../images/addimage3.png";

function Advertise() {
  const adarray = [addimage1, addimage2, addimage3];
  let randomImage = Math.floor(Math.random() * adarray.length);
  return (
    <div className="advertiseWrap">
      <a href="" className="advertise">
        <img src={adarray[randomImage]} alt="" />
      </a>
    </div>
  );
}

export default Advertise;
