import "./Type.css";
import React, { useState, useEffect } from "react";
import TypeList from "./TypeList";
//
function Type(props) {
  const [numberHotels, setNumberHotels] = useState(0);
  const [numberApartments, setNumberApartments] = useState(0);
  const [numberResorts, setNumberResorts] = useState(0);
  const [numberVillas, setNumberVillas] = useState(0);
  const [numberCabins, setNumberCabins] = useState(0);

  const number = (data) => {
    const array = [];
    props.hotel.map((i) => {
      if (i.type === data) {
        array.push(i);
      }
    });
    return array.length;
  };

  useEffect(() => {
    setNumberHotels(number("hotel"));
    setNumberApartments(number("apartment"));
    setNumberResorts(number("resort"));
    setNumberVillas(number("villa"));
    setNumberCabins(number("carbin"));
  }, [props]);

  const dataType = [
    {
      name: "Hotels",
      count: numberHotels,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: numberApartments,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: numberResorts,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: numberVillas,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: numberCabins,
      image: "./images/type_5.jpg",
    },
  ];

  return (
    <div className="contaiType">
      <h2>Browse By property type</h2>
      <div className="contaiFlex">
        {dataType.map((item) => (
          //truyền dữ liệu data ở trên sang TypeList
          <TypeList
            key={item.name}
            name={item.name}
            count={item.count}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
export default Type;
