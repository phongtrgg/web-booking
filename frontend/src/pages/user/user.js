import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../component/NavBar/NavBar";
import "./user.css";
import useRequest from "../../Hook/useRequest";
import Contact from "../../component/Footer/Contact";
import Footer from "../../component/Footer/Footer";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const isLogin = useSelector((state) => state.login.login);
  const user = useSelector((state) => state.login.user);
  const { request, resData, err } = useRequest();
  const [clickEdit, setClickEdit] = useState(false);
  const emailRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login?mode=login");
    }
  }, []);
  useEffect(() => {
    if (user && user.id) {
      const data = { id: user.id, user: user.name };
      request(data, "user/getDetail");
    }
  }, [user]);

  useEffect(() => {
    if (resData && resData.user && resData.user.isAdmin) {
      setAdmin(true);
    }
    if (resData && resData.get === "user") {
      setShow(resData);
    }
    console.log(resData);
    if (resData && resData.edit === true) {
      setClickEdit(false);
      const data = { id: user.id, user: user.name };
      request(data, "user/getDetail");
    }
  }, [resData]);

  const editHanler = (e) => {
    e.preventDefault();
    setClickEdit(true);
  };
  const editProducts = (e) => {
    e.preventDefault();
    window.location = "https://test-admin-booking.web.app/";
  };

  useEffect(() => {
    if (clickEdit === true) {
      emailRef.current.value = resData.user.email;
      phoneRef.current.value = resData.user.phoneNumber;
      nameRef.current.value = resData.user.fullName;
      passwordRef.current.value = resData.user.password;
    }
  }, [clickEdit]);

  const saveHanler = (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let phone = phoneRef.current.value;
    let fullname = nameRef.current.value;
    if (emailRef.current.value === "") {
      email = "No";
    }
    if (phoneRef.current.value === "") {
      phone = 0;
    }
    if (nameRef.current.value === "") {
      fullname = "No";
    }
    const data = {
      email: email,
      phone: phone,
      fullName: fullname,
      password: passwordRef.current.value,
      id: user.id,
    };
    request(data, "user/edit");
  };

  const canceHanler = (e) => {
    e.preventDefault();
    setClickEdit(false);
  };

  return (
    <>
      <NavBar login={true} />
      {!clickEdit && isLogin && show && (
        <div className="boxUser">
          <div className="boxTitle">
            <h2>User:</h2> <p>{user.name}</p>
          </div>
          <div className="boxContent">
            <h2>Email:</h2> <p>{show.user.email}</p>
          </div>
          <div className="boxContent">
            <h2>PhoneNumber:</h2> <p>{show.user.phoneNumber}</p>
          </div>
          <div className="boxContent">
            <h2>FullName:</h2> <p>{show.user.fullName}</p>
          </div>
          <div className="boxContent">
            <h2>Order:</h2> <p>{show.order}</p>
          </div>
          <div className="boxContent">
            <h2>Admin:</h2>
            {admin && <p> Yes</p>}
            {!admin && <p> No</p>}
          </div>
          <button onClick={editHanler}>Edit</button>
          {admin && (
            <button onClick={editProducts} className="btnAdmin">
              Edit Products
            </button>
          )}
        </div>
      )}
      {clickEdit && isLogin && resData && (
        <div className="boxUser">
          <div className="boxTitle">
            <h2>User:</h2> <p>{user.name}</p>
          </div>
          <div className="boxContent fixBorder">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref={emailRef}
            ></input>
          </div>
          <div className="boxContent fixBorder">
            <label>PhoneNumber:</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="PhoneNumber"
              ref={phoneRef}
            ></input>
          </div>
          <div className="boxContent fixBorder">
            <label>FullName:</label>
            <input
              type="text"
              name="fullname"
              placeholder="FullName"
              ref={nameRef}
            ></input>
          </div>
          <div className="boxContent fixBorder">
            <label>password:</label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              ref={passwordRef}
              required
            ></input>
          </div>
          <div className="boxBtn">
            <button onClick={saveHanler}>Save</button>
            <button onClick={canceHanler}>Cance</button>
          </div>
        </div>
      )}
      <Contact />
      <Footer />
    </>
  );
}
export default UserPage;
