import React, { useEffect, useState } from "react";
import "./DetailContent.css";
import { useParams } from "react-router-dom";
import useRequest from "../../Hook/useRequest";
import BookForm from "./bookForm";

function DetailContent() {
  const { request, resData, err } = useRequest();
  const params = useParams();
  const id = params.detailId;

  useEffect(() => {
    if (id) {
      request(null, `hotel/${id}`);
    }
  }, []);

  return (
    <>
      {resData && !err && (
        <div className="boxContentDetail">
          {/* // */}
          <button>Reserve or Book Now!</button>
          <h2>{resData.name}</h2>

          <p className="address">{resData.address}</p>
          <p className="distance">{`Excellent location - ${resData.distance}m from center`}</p>
          <p className="price">{`Book a stay over $${resData.cheapestPrice} at this property and get a free airport taxi`}</p>
          {/* // */}
          <div className="boxGrid">
            {resData.photos.map((image, i = 0) => {
              i++;
              return (
                <img src={resData.photos[i - 1]} key={i} alt="img"></img>
              );
            })}
          </div>
          {/* // */}
          <div className="boxDetailChild">
            <div className="child-1">
              <h3>{resData.name}</h3>
              <p>{resData.desc}</p>
            </div>
            <div className="child-2">
              <p className="price-9n">
                {" "}
                <strong>${resData.cheapestPrice}</strong>
              </p>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
          {/* // */}
        </div>
      )}
      {err && <h1 className="errHome">Error: fetch not found</h1>}
      {!resData && !err && <h1 className="waitHome">Loading ...</h1>}
      <BookForm info={resData} key="form" />
    </>
  );
}
export default DetailContent;
