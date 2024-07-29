import React from "react";
import "./StartFromScratch.scss";
import facebook from "../../assets/image/facebook.png";
import instagram from "../../assets/image/instagram.png";
import twitter from "../../assets/image/twitter.png";

import OptionCard from "../../components/ServiceComponent/OptionCard/OptionCard";

function StartFromScratch() {
  return (
    <div className="startFromScratch">
      <h1>Generate unique captions from scratch</h1>

      <div className="startFromScratch__description">
        <span>
          Choose the type of post you want a caption for, and let Skipli Al
          writeit for you
        </span>
        <p>What kind of post do you want a caption for?</p>
      </div>

      <OptionCard
        to="/start-from-scratch/faceboook-post"
        imgSrc={facebook}
        heading="Facebook post"
        description="Generate caption for a post"
      />

      <OptionCard
        to="/instagram-post"
        imgSrc={instagram}
        heading="Instagram post"
        description="Generate caption for a post"
      />

      <OptionCard
        to="/twitter-post"
        imgSrc={twitter}
        heading="Twitter post"
        description="Generate caption for a post"
      />
    </div>
  );
}

export default StartFromScratch;
