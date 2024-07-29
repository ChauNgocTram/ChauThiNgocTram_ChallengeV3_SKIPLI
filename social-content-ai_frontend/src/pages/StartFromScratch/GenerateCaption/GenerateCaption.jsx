import React from "react";
import "./GenerateCaption.scss";
import CaptionGeneratedList from "../../../components/ServiceComponent/CaptionGeneratedList/CaptionGeneratedList";

function GenerateCaption() {
  return (
    <div className="generateCaption">
      <h1>Facebook post</h1>

      <form >
        <div className="generateCaption__field">
          <label>What topic do you want a caption for?</label>
          <input type="text" />
        </div>

        <div className="generateCaption__field">
          <label>What should your caption sound like?</label>
          <input type="text" />
        </div>

        <button className="generateCaption__btn">Generate caption</button>
      </form>

      <CaptionGeneratedList/>
    </div>
  );
}

export default GenerateCaption;
