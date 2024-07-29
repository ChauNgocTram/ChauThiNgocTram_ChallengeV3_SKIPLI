import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbLayout2 } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import logoIcon from "../../assets/image/logoIcon.jpg";
import "./Sidebar.scss";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Services",
      icon: <TbLayout2 />,
      path: `/`,
    },
    {
      title: "Profile",
      icon: <AiOutlineUser />,
      path: `/profile`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="sidebar">
      <NavLink to="/" className="sidebar__header">
        <img src={logoIcon} alt="" />
        <span>Skipli AI</span>
      </NavLink>

      <div className="sidebar__tab">
        {navLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={
              "sidebar__tab__item " +
              (activeIndex === index ? "sidebar__tab__item--active" : "")
            }
          >
            <div
              onClick={() => handleNavClick(index)}
              className="sidebar__tab__item__content"
            >
              <span className="sidebar__tab__item__icon">{item.icon}</span>
              <span className="sidebar__tab__item__title">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
