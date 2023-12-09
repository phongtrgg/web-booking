import React, { useEffect, useState } from "react";
import "./NavBar.css";
import NavBarItem from "./NavBarItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/store";
//
let DemoData = [
  {
    id: "1",
    type: "Stays",
    icon: "fa-bed",
    active: true,
  },
  {
    id: "2",
    type: "Flights",
    icon: "fa-plane",
    active: false,
  },
  {
    id: "3",
    type: "Car rentals",
    icon: "fa-car",
    active: false,
  },
  {
    id: "4",
    type: "Attractions",
    icon: "fa-bed",
    active: false,
  },
  {
    id: "5",
    type: "Airport taxis",
    icon: "fa-taxi",
    active: false,
  },
];
const NavBar = function (props) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.login);
  const user = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  const [data, setData] = useState(DemoData);
  const [showName, setShowName] = useState();
  const id = user.id;

  function onClickHome() {
    navigate("/");
  }
  function onLogin() {
    navigate("/login?mode=login");
  }
  function onSignup() {
    navigate("/login?mode=signup");
  }
  const onTransactions = () => {
    navigate("/transaction");
  };

  useEffect(() => {
    if (user && user.name) {
      setShowName(user.name);
    }
  }, [user]);
  //
  const onLogout = (event) => {
    event.preventDefault();
    dispatch(loginAction.LOGOUT());
    navigate("/login?mode=login");
  };
  const moveUser = () => {
    navigate(`/user`);
  };

  const onMouseEnter = () => {
    setShowName("Info User");
  };
  const onMouseLeave = () => {
    setShowName(user.name);
  };

  return (
    <div className="nav">
      <div className="container">
        {!isLogin && (
          <div className="flex-Nav">
            <h1 className="titleWeb" onClick={onClickHome}>
              Booking Website
            </h1>
            <div className="btn">
              <button className="btn-1" onClick={onSignup}>
                Register
              </button>
              <button className="btn-1" onClick={onLogin}>
                Login
              </button>
            </div>
          </div>
        )}{" "}
        {isLogin && (
          <div className="flex-Nav fix-box1-login">
            <h1 onClick={onClickHome}>Booking Website</h1>

            <div className="btn fix-box2-login">
              <h2
                className="userName"
                onClick={moveUser}
                onMouseMove={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {showName}
              </h2>
              {!props.trans && (
                <button className="btn-1" onClick={onTransactions}>
                  Transactions
                </button>
              )}

              <button className="btn-1" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
        {props.onPageHome && <NavBarItem items={data}></NavBarItem>}
      </div>
    </div>
  );
};
export default NavBar;
