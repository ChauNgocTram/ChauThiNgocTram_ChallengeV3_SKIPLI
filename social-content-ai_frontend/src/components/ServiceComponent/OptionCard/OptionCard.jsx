import React from "react";
import "./OptionCard.scss";
import { NavLink } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const OptionCard = ({ to, imgSrc, heading, description }) => {
  return (
    <div className="startFromScratch__option">
      <div className="startFromScratch__option__left">
        <img src={imgSrc} alt={heading} />
        <div className="startFromScratch__option__left__info">
          <h3>{heading}</h3>
          <p>{description}</p>
        </div>
      </div>

      <NavLink to={to} className="startFromScratch__option__right">
        <MdArrowForwardIos size={30} />
      </NavLink>
    </div>
  );
};

export default OptionCard;
