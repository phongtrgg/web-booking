import React from "react";
import "./Contact.css";
//
function Contact() {
  return (
    <div className="contaiBackGround">
      <div className="container contaiConcact">
        <h2>Save time, save money!</h2>
        <p>Sign upand we'll send the best deals to you</p>
        <input
          type="text"
          className="form-control"
          placeholder=" Your Email"
          // aria-label="Recipient's username"
          aria-describedby="button-addon2"
        ></input>
        <button>Subscribe</button>
      </div>
    </div>
  );
}
export default Contact;
