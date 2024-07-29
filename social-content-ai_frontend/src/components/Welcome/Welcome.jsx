import React from "react";
import logo from "../../assets/image/logo.png";
import "./Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <img src={logo} alt="" width={250} height={100} />
      <h1>Welcome to Skipli AI</h1>
    </div>
  );
}

export default Welcome;
