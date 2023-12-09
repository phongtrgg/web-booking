import "./transaction.css";
import React, { useEffect, useState } from "react";
import useRequest from "../../Hook/useRequest";

function TransDetail(props) {
  const { request, resData, err } = useRequest();

  useEffect(() => {
    const id = props.id;
    request(null, `hotel/${id}`);
  }, [props]);

  return (
    <>
      {resData && props && (
        <tr>
          {props.stt >= 10 && <td>{props.stt}</td>}
          {props.stt < 10 && <td>0{props.stt}</td>}
          <td>{resData.name}</td>
          <td>{props.room.map((r) => ` ${r.room}`)}</td>
          <td>{`${props.start}/${props.end}`}</td>
          <td>${props.price}</td>
          <td>{props.payment}</td>
          {props.status.toString() === "Booked" && (
            <td>
              <p className="booked">{props.status}</p>
            </td>
          )}
          {props.status.toString() === "Checkin" && (
            <td>
              <p className="checkin">{props.status}</p>
            </td>
          )}
          {props.status.toString() === "Checkout" && (
            <td>
              <p className="checkout">{props.status}</p>
            </td>
          )}
        </tr>
      )}
    </>
  );
}
export default TransDetail;
