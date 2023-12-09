import React from "react";
import "./NavBar.css";

//
const NavBarItem = function (props) {
  return (
    <div className="flex-Nav fix-nav navItem">
      <a
        href="#top"
        className={props.items[0].active === true ? "border" : "1"}
      >
        <i className="fa fa-bed"></i> {props.items[0].type}
      </a>
      <a
        href="#top"
        className={props.items[1].active === true ? "border" : "1"}
      >
        <i className="fa fa-plane"></i> {props.items[1].type}
      </a>
      <a
        href="#top"
        className={props.items[2].active === true ? "border" : "1"}
      >
        <i className="fa fa-car"></i> {props.items[2].type}
      </a>
      <a
        href="#top"
        className={props.items[3].active === true ? "border" : "1"}
      >
        <i className="fa fa-bed"></i> {props.items[3].type}
      </a>
      <a
        href="#top"
        className={props.items[4].active === true ? "border" : "1"}
      >
        <i className="fa fa-taxi"></i> {props.items[4].type}
      </a>
    </div>
  );
};
export default NavBarItem;
