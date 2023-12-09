import "./SearchList.css";
import React from "react";
import { useNavigate } from "react-router-dom";
//
function SearchList(props) {
  const navigate = useNavigate();
  const openDetail = (event) => {
    event.preventDefault();
    navigate(`/detail/${props.id}`);
  };
  return (
    <div className="contenBoxSearchMain">
      <div className="boxSearchContentChildren">
        <img src={props.image_url} alt="img"></img>
        {/* // */}
        <div className="containerSearch2-3">
          <div className="flexSearch-2">
            <h2 className="searchName">{props.name}</h2>
            <p>{props.distance} from center</p>
            <p className="searchTag">{props.tag}</p>
            <p>
              <strong>{props.description}</strong>
            </p>
            <p>{props.type}</p>
            <p className="searchFreeCancel-1">
              {props.free_cancel === true ? `Free cancellation` : ""}
            </p>
            <p className="searchFreeCancel-2">
              {props.free_cancel === true
                ? "You can cancel later, so lock in the great price today"
                : ""}
            </p>
          </div>
          {/* // */}
          <div className="flexSearch-3">
            <div>
              <h3>{props.rate_text}</h3>
              <p>{props.rate}</p>
            </div>

            <p>
              <strong> ${props.price}</strong>
            </p>
            <p>CheapestPrice</p>

            <button onClick={openDetail}>See availability</button>
          </div>
        </div>
        {/* // */}
      </div>
    </div>
  );
}
export default SearchList;
