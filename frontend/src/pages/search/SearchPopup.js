import "./SearchPopup.css";
import React, { useRef } from "react";
import { searchInfoAction } from "../../store/store";
import { useDispatch } from "react-redux";
//
function SearchPopup() {
  const dispatch = useDispatch();
  const cityRef = useRef();
  const dateRef = useRef();
  const peopleRef = useRef();
  const minRef = useRef();
  const maxRef = useRef();
  const roomRef = useRef();

  const searchHotel = (event) => {
    event.preventDefault();
    const data = {
      city: cityRef.current.value,
      date: dateRef.current.value,
      minPrice: minRef.current.value,
      maxPrice: maxRef.current.value,
      people: peopleRef.current.value,
      room: roomRef.current.value,
    };
    dispatch(searchInfoAction.ON_ADD(data));
  };
  return (
    <div className="box-1 boxHidden">
      <h2>Search</h2>
      <form>
        <h4>City</h4>
        <input
          className="inputDes"
          type="text"
          ref={cityRef}
          required
        ></input>
        <br></br>
        <h4>Check-in Date</h4>
        <input
          className="inputDate"
          placeholder="06/24/2022"
          type="date"
          ref={dateRef}
        ></input>
        <h4>Options</h4>
        <div className="boxInput">
          <label>Min pice per night</label>
          <input
            className="inputNumber"
            type="number"
            ref={minRef}
          ></input>
          <br></br>
          <label>Max pice per night</label>
          <input
            className="inputNumber"
            type="number"
            ref={maxRef}
          ></input>
          <br></br>
          <label>number of people</label>
          <input
            className="inputNumber"
            type="number"
            ref={peopleRef}
            required
          ></input>
          <br></br>
          <label>Room</label>
          <input
            className="inputNumber"
            type="number"
            ref={roomRef}
          ></input>
        </div>
        <button onClick={searchHotel}>Search</button>
      </form>
    </div>
  );
}
export default SearchPopup;
