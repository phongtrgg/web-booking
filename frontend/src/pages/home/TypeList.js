import React from "react";
import "./Type.css";
//render TypeList
function TypeList(props) {
  return (
    <div className="item-box">
      <img className="imgType" src={props.image} alt="img"></img>
      <div className="">
        <h3>{props.name}</h3>
        <p>{props.count} hotels</p>
      </div>
    </div>
  );
}
export default TypeList;
