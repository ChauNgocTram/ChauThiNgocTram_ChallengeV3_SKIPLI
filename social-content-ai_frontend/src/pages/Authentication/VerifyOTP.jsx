import React, { useState } from "react";
import { useValidateAccessCode } from "../../hooks/useAuth";
import Welcome from "../../components/Welcome/Welcome";
import "./VerifyOTP.scss";

function VerifyOTP() {
  const [accessCode, setAccessCode] = useState("");
  const { mutate } = useValidateAccessCode();

  const handleSubmit = () => {
    if (accessCode) {
      mutate({ accessCode });
    }
  };

  return (
    <div>
      <Welcome />

      <div className="verify__description">
        <p>
          SkipliAI has sent an OTP code to: <span>{localStorage.getItem("phoneNumber")}</span>
        </p>
      </div>

      <div className="verify__form">
        <input
          placeholder="Enter your code here"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="verify__form__otpCode"
        />
        <button
          className="verify__form__button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
