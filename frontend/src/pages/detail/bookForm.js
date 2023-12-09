import React, { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "../../Hook/datePicker";
import "./book.css";
import useRequest from "../../Hook/useRequest";
import TypeRoom from "./typeRoom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function BookForm(props) {
  const hotel = props.info;
  const [validRequest, setValidRequest] = useState();
  const [room, setRoom] = useState([]);
  const [day, setDay] = useState();
  const [priceAll, setPriceAll] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cardRef = useRef();
  const methodRef = useRef();
  const [booked, setBooked] = useState();
  const { resData, request, err } = useRequest();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.login.user);
  const login = useSelector((state) => state.login.login);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setDateState([item.selection]);
  };

  useEffect(() => {
    if (props && dateState && props.info) {
      const data = {
        id: props.info.rooms,
        start: dateState[0].startDate,
        end: dateState[0].endDate,
      };
      request(data, "room/check");
    }
  }, [dateState[0].endDate]);

  useEffect(() => {
    if (dateState) {
      const start = dateState[0].startDate.toString().slice(8, 10);
      const end = dateState[0].endDate.toString().slice(8, 10);
      setDay(end - start + 1);
    }
  }, [dateState]);

  const total = () => {
    let price = 0;
    if (room && room.length !== 0) {
      room.map((i) => {
        return (price = price + i.price);
      });
    }

    setPriceAll(price * day);
  };

  useEffect(() => {
    total();
  }, [day, room]);

  const onOrder = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      phoneRef.current.value !== ""
    ) {
      const user = {
        fullName: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        card: cardRef.current.value,
      };

      if (login) {
        const data = {
          id: userLogin.id,
          userName: userLogin.name,
          user: user,
          room: room,
          price: priceAll,
          dateStart: dateState[0].startDate,
          dateEnd: dateState[0].endDate,
          hotel: hotel._id,
          payment: methodRef.current.value,
          status: "Booked",
        };
        console.log(data);
        request(data, "transaction/add");
      } else {
        setTimeout(() => {
          setValidRequest("");
        }, 3000);
        return setValidRequest("Xin hãy đăng nhập để đặt phòng");
      }
    } else {
      setTimeout(() => {
        setValidRequest("");
      }, 3000);
      return setValidRequest("Xin hãy điền đủ thông tin");
    }
  };
  useEffect(() => {
    if (resData && resData.booked) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      cardRef.current.value = "";
      setRoom([]);
      setBooked("Đã Đặt Phòng thành công!!!");
      setTimeout(() => {
        setBooked("");
      }, 3000);
      setTimeout(() => {
        navigate("/transaction");
      }, 3000);
    }
  }, [resData]);
  console.log(resData);
  return (
    <React.Fragment>
      <div className="BookBox1">
        <div className="flexBook1">
          <h1>Dates</h1>
          <DatePicker dateState={dateState} handleChange={handleChange} />
        </div>
        <div className="flexBook2">
          <h1>Reserve info</h1>
          <label>Your Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            ref={nameRef}
            required
          ></input>
          <br />
          <label>Your Email:</label>
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            name="email"
            required
          ></input>
          <br />
          <label>Your Phone Number:</label>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            ref={phoneRef}
            required
          ></input>
          <br />
          <label>Your Identity Card Number:</label>
          <input
            type="number"
            name="card"
            placeholder="Card Number"
            ref={cardRef}
          ></input>
        </div>
      </div>
      <div className="bookBox2">
        <h1>Select Rooms</h1>

        <div className="gridBox">
          {resData &&
            resData.length > 0 &&
            dateState[0].startDate &&
            resData.map((item) => {
              return (
                <TypeRoom
                  desc={item.desc}
                  price={item.price}
                  title={item.title}
                  roomNum={item.roomNumbers}
                  people={item.maxPeople}
                  key={item._id}
                  id={item._id}
                  room={room}
                  setRoom={setRoom}
                />
              );
            })}
        </div>
        {booked && <p className="endBooked">{booked}</p>}
        {validRequest && <p className="errValid">{validRequest}</p>}
        {priceAll !== 0 && (
          <h1 className="total">{`Total Bill: $${priceAll}`}</h1>
        )}
        {!priceAll && <h1 className="total">Total Bill: $</h1>}

        <div className="boxFlex">
          <label>Payment method</label>
          <br />
          <select ref={methodRef}>
            <option> Credit Card </option>
            <option> Cash</option>
          </select>

          <button onClick={onOrder}>Reserve Now</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default BookForm;
