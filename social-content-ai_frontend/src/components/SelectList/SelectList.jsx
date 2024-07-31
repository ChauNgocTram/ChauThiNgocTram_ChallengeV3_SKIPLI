import React, { useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import './SelectList.scss';

const SelectList = ({ lists, selected, setSelected, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (list) => {
    setSelected(list);
    setIsOpen(false); 
  };

  return (
    <div className="selectList">

      <div className="selectList__button" onClick={handleToggle}>
        <span>{selected || "Select a tone"}</span>
        <div className="selectList__button__icon">
          <BsChevronExpand aria-hidden="true" />
        </div>
      </div>

      {isOpen && (
        <div className="selectList__options">
          {lists.map((list, index) => (
            <div
              key={index}
              className={`selectList__option ${selected === list ? 'active' : ''}`}
              onClick={() => handleOptionClick(list)}
            >
              <span>{list}</span>
              {selected === list && (
                <div className="selectList__option__icon">
                  <MdCheck aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectList;
