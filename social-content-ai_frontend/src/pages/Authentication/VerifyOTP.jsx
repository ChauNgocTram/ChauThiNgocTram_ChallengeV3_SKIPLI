import React from "react";
import Welcome from "../../components/Welcome/Welcome";

import "./VerifyOTP.scss";

function VerifyOTP() {
  return (
    <div>
      <Welcome />

      <div className="verify__description">
        <p>
          SkipliAI has sent an OTP code to: <span>+1 2346789121</span>
        </p>
      </div>

      <div className="verify__form">
        <input
          placeholder="Enter your code here"
          //   value={value}
          //  onChange={setValue}
          className="verify__form__otpCode"
        />
        <button className="verify__form__button">Submit</button>
      </div>
    </div>
  );
}

export default VerifyOTP;
