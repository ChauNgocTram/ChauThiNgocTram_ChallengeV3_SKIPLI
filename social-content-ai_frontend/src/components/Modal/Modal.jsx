import React from "react";
import "./Modal.scss"; 
import { useNavigate } from "react-router-dom"; 

const Modal = ({ isVisible, accessCode }) => {
  const navigate = useNavigate(); 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    navigate("/auth/verify-otp"); 
  };

  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Access Code</h2>
        <p>{accessCode}</p>
        <button onClick={copyToClipboard}>Copy Code</button>
      </div>
    </div>
  );
};

export default Modal;
