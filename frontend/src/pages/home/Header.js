import React, { useRef, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchInfoAction } from "../../store/store";

//
const Header = function (props) {
  const goingRef = useRef();
  const dateRef = useRef();
  const peopleRef = useRef();
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  const [err, setErr] = useState();

  function onClickSeach(event) {
    event.preventDefault();
    if (
      goingRef.current.value.length > 0 &&
      dateRef.current.value.length > 0 &&
      peopleRef.current.value.length > 0
    ) {
      const data = {
        city: goingRef.current.value,
        date: dateRef.current.value,
        people: peopleRef.current.value,
      };
      dispatch(searchInfoAction.ON_ADD(data));
      navigate("/search");
    } else {
      setErr("Xin hãy nhập thông tin");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  }

  function onSignup() {
    navigate("/login?mode=signup");
  }

  //
  return (
    <div className="head">
      <div className="container header">
        <div className="header-top">
          <h2>A lifetime of discounts? It's Genius.</h2>
          <p>
            Get rewarded for your travels-unlock instant savings of 10% or
            more with a free account
          </p>
          {!login && (
            <button className="btn-head" onClick={onSignup}>
              Sign in / Register
            </button>
          )}
        </div>

        {/* // */}
        <div className="card">
          <div className="flex-children">
            <i className="fa fa-bed icHead"></i>
            <span>
              <input
                type="text"
                className="form-control"
                placeholder=" Where are you going?"
                // aria-label="Recipient's username"
                aria-describedby="button-addon2"
                ref={goingRef}
                required
              ></input>
            </span>
          </div>
          {/* // */}
          <div className="flex-children new-expense__control">
            <i className="fa fa-calendar icHead"></i>
            <input
              className="inputDate"
              type="date"
              min="2022-01-01"
              max="2026-12-31"
              ref={dateRef}
              required
            ></input>
          </div>

          {/* // */}
          <div className="flex-children">
            <i className="fa fa-female icHead"></i>
            <span>
              <input
                type="number"
                className="form-control"
                placeholder=" 1 adult 0 children 1 room"
                aria-describedby="button-addon2"
                ref={peopleRef}
                required
              ></input>
            </span>
          </div>
          {/* // */}
          <button onClick={onClickSeach} className="btn-search">
            Search
          </button>
        </div>
      </div>

      <div className="container hidden"></div>

      {err && <h1 className="errNav">{err}</h1>}
    </div>
  );
};
export default Header;
