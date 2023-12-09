import React, { useState, useEffect } from "react";
import "./HotelList.css";
import { useNavigate } from "react-router-dom";
import Item from "./itemHotel";
//
function HotelList(props) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const dataDown = props.hotel.sort(function (a, b) {
      return a.rating - b.rating;
    });
    const dataUp = dataDown.reverse();
    setData(dataUp.slice(0, 3));
  }, [props]);

  const openDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className=" contaiHotel">
      <h2>Homes Guests Love</h2>
      {data && (
        <div className="bigConTaiNer">
          {data.map((i) => {
            return (
              <Item
                key={i._id}
                img={i.photos[0]}
                price={i.cheapestPrice}
                name={i.name}
                onClick={openDetail}
                city={i.city}
                id={i._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default HotelList;
