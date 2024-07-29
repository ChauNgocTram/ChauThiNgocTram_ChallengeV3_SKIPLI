import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./Authentication.scss";
import Welcome from "../../components/Welcome/Welcome";

function Authentication() {
  const [value, setValue] = useState();
  return (
    <div className="">
      <Welcome />

      <div className="authentication__description">
        <p>Enter a mobile phone number that you have access to.</p>
        <p>This number will be use to login to SkipliAI.</p>
      </div>

      <div className="authentication__form">
        <PhoneInput
          defaultCountry="US"
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          className="authentication__form__phone"
        />
        <button className="authentication__form__button">
          Send Verification Code
        </button>
      </div>
    </div>
  );
}

export default Authentication;
