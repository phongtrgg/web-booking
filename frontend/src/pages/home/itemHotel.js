import React from "react";
const Item = (props) => {
  const openDetail = (event) => {
    event.preventDefault();
    props.onClick(props.id);
  };
  return (
    <div className="box-content" onClick={openDetail}>
      <img className="hotelImg" src={props.img} alt="img"></img>
      <h3>
        <a href="/detail">{props.name}</a>
      </h3>
      <p>{props.city}</p>
      <p>
        <strong>Starting from ${props.price}</strong>
      </p>
    </div>
  );
};
export default Item;
