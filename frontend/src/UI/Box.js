import { React } from "react";
import "./Box.css";
//
function Box(props) {
  const classes = "container " + props.className;
  return <div className={classes}>{props.children}</div>;
}
export default Box;
