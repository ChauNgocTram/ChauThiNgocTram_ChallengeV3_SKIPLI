import React from "react";
import "./CaptionGeneratedList.scss";

import { GrShareOption } from "react-icons/gr";
import { GoBookmark } from "react-icons/go";

const CaptionGeneratedList = () => {
  return (
    <div className="captionGeneratedList">
      <h2>Captions generated for you</h2>

      <div className="captionCard">
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse,
          molestias quibusdam eum fugiat assumenda quae beatae possimus
          consequuntur totam amet!
        </span>

        <div className="captionCard__action">
          <div className="captionCard__action__share">
            <GrShareOption /> Share
          </div>

          <div className="captionCard__action__save">
            <GoBookmark /> Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionGeneratedList;
