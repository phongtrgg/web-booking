import React, { useState, useEffect } from "react";
import "./HomeCity.css";
import imgHN from "../../image/Ha Noi.jpg";
import imgHCM from "../../image/Da Nang.jpg";
import imgDN from "../../image/HCM.jpg";

//
const HomeCity = function (props) {
  const [numHN, setNumHN] = useState();
  const [numHCM, setNumHCM] = useState();
  const [numDN, setNumDN] = useState();
  console.log(props);
  useEffect(() => {
    setNumHN(number("Ha Noi"));
    setNumHCM(number("Ho Chi Minh"));
    setNumDN(number("Da Nang"));
  }, [props]);

  const number = (data) => {
    const array = [];
    props.hotel.map((i) => {
      if (i.city === data) {
        array.push(i);
      }
    });
    return array.length;
  };

  return (
    <div className=" City">
      <div className="Ci City-1">
        <img className="imgCity" src={imgHN} alt="img"></img>
        <div className="fix content-1">
          <h3>Ha Noi</h3>
          {numHN !== 0 && <p>{`${numHN} properties`}</p>}
          {numHN === 0 && <p>0 properties</p>}
        </div>
      </div>

      <div className="Ci City-2">
        <img className="imgCity" src={imgDN} alt="img"></img>
        <div className="fix content-2">
          <h3>Ho Chi Minh</h3>
          {numHCM !== 0 && <p>{`${numHCM} properties`}</p>}
          {numHCM === 0 && <p>0 properties</p>}
        </div>
      </div>

      <div className="Ci City-3">
        <img className="imgCity" src={imgHCM} alt="img"></img>
        <div className="fix content-3">
          <h3>Da Nang</h3>
          {numDN !== 0 && <p>{`${numDN} properties`}</p>}
          {numDN === 0 && <p>0 properties</p>}
        </div>
      </div>
    </div>
  );
};
export default HomeCity;
