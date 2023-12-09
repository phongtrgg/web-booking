import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

function DatePicker(props) {
  return (
    <DateRange
      className="datePicker"
      ranges={props.dateState}
      onChange={props.handleChange}
      //   moveRangeOnFirstSelection={false}
    />
  );
}
export default DatePicker;
