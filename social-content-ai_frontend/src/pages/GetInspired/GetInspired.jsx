import React from "react";
import "./GetInspired.scss";

function GetInspired() {
  return (
    <div className="getInspired">
      <h1>GetInspired</h1>

      <span>
        Stick staring at a blank page? Tell us what topic you have in mind and
        Skipli AI will generate a list of post ides and captions for you.
      </span>

      <form>
        <div className="generateCaption__field">
          <label>What topic do you want ideas for?</label>
          <input type="text" placeholder="Enter a topic"/>
        </div>

        <button className="generateCaption__btn">Generate ideas</button>
      </form>
    </div>
  );
}

export default GetInspired;
