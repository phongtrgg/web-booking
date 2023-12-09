import React from "react";
import "./Footer.css";
//
function FooterList(props, i) {
  return (
    <div className="">
      <ul>
        <a href="#top">{props.col_values[0]}</a>
      </ul>

      <ul>
        <a href="#top">{props.col_values[1]}</a>
      </ul>

      <ul>
        <a href="#top">{props.col_values[2]}</a>
      </ul>

      <ul>
        <a href="#top">{props.col_values[3]}</a>
      </ul>

      <ul>
        <a href="#top">{props.col_values[4]}</a>
      </ul>
    </div>
  );
}
export default FooterList;
