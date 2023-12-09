import React, { useEffect } from "react";
import NavBar from "../../component/NavBar/NavBar";
import { useSelector } from "react-redux";
import useRequest from "../../Hook/useRequest";
import "./transaction.css";
import TransDetail from "./transDetail";
import Contact from "../../component/Footer/Contact";
import Footer from "../../component/Footer/Footer";

function Transaction() {
  const login = useSelector((state) => state.login.login);
  const user = useSelector((state) => state.login.user);
  const { request, resData, err } = useRequest();
  console.log(resData);

  useEffect(() => {
    const data = { id: user.id, name: user.name };
    request(data, "transaction/get");
  }, [user]);

  return (
    <>
      <NavBar trans={true} />
      {login && (
        <div className="tranBox">
          <h1>Your Transactions</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resData &&
                resData.length > 0 &&
                resData.map((i, x = 0) => {
                  x++;
                  return (
                    <TransDetail
                      key={i.hotel}
                      id={i.hotel}
                      price={i.price}
                      room={i.room}
                      start={i.dateStart}
                      end={i.dateEnd}
                      status={i.status}
                      payment={i.payment}
                      stt={x}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      <Contact />
      <Footer />
    </>
  );
}
export default Transaction;
