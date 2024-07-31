import React, { useState } from "react";
import { useSendVerificationCode } from "../../hooks/useAuth";
import "./Authentication.scss";
import Welcome from "../../components/Welcome/Welcome";
import Modal from "../../components/Modal/Modal"; 

function Authentication() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const { mutate } = useSendVerificationCode();

  const handleSubmit = () => {
    if (phoneNumber) {
      mutate(phoneNumber, {
        onSuccess: (data) => {
          setAccessCode(data.accessCode); 
          setIsModalVisible(true); 
        },
      });
    } else {
      alert("Please enter a phone number");
    }
  };

  return (
    <div className="">
      <Welcome />

      <div className="authentication__description">
        <p>Enter a mobile phone number that you have access to.</p>
        <p>This number will be used to login to SkipliAI.</p>
      </div>

      <div className="authentication__form">
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="authentication__form__phone"
        />
        <button
          className="authentication__form__button"
          onClick={handleSubmit}
        >
          Send Verification Code
        </button>
      </div>

      <Modal
        isVisible={isModalVisible}
        accessCode={accessCode}
      />
    </div>
  );
}

export default Authentication;
