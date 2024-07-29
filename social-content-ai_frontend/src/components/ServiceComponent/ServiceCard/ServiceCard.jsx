import React from "react";
import { NavLink } from "react-router-dom";
import './ServiceCard.scss'

const ServiceCard = ({ to, imgSrc, heading, description }) => {
  return (
    <NavLink to={to} className="service__card">
      <img src={imgSrc} alt="" />
      <div className="service__card__content">
        <h2>{heading}</h2>
        <span>{description}</span>
      </div>
    </NavLink>
  );
};

export default ServiceCard;
