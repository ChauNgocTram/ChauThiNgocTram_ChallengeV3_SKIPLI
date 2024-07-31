import React, { useState } from "react";
import "./GenerateCaption.scss";
import CaptionGeneratedList from "../../../components/ServiceComponent/CaptionGeneratedList/CaptionGeneratedList";
import { useParams } from "react-router-dom";
import { useGenerateCaptions } from "../../../hooks/useContent";
import SelectList from "../../../components/SelectList/SelectList";

function GenerateCaption() {
  const { socialNetwork } = useParams();
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("");
  const [captions, setCaptions] = useState([]);
  const { mutate: generateCaptions, isLoading } = useGenerateCaptions();

  const handleGenerateCaptions = () => {
    generateCaptions(
      { socialNetwork, subject, tone },
      {
        onSuccess: (data) => {
          setCaptions(data.captions); // Data is expected to be { captions: [...] }
        },
        onError: (error) => {
          console.error("Error generating captions:", error);
        },
      }
    );
  };

  if (!socialNetwork) {
    return <div>Error: Social Network parameter is missing!</div>;
  }

  const tones = [
    "Friendly",
    "Luxury",
    "Relaxed",
    "Professional",
    "Bold",
    "Adventurous",
    "Witty",
    "Persuasive",
    "Empathetic",
  ];

  return (
    <div className="generateCaption">
      <h1>
        {socialNetwork.charAt(0).toUpperCase() + socialNetwork.slice(1)} post
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateCaptions();
        }}
      >
        <div className="generateCaption__field">
          <label>What subject do you want a caption for?</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="generateCaption__field">
          <label>What should your caption sound like?</label>
          <SelectList lists={tones} selected={tone} setSelected={setTone} />
        </div>
        
        <button className="generateCaption__btn" type="submit">
          {isLoading ? 'Generating...' : 'Generate caption'}
        </button>
      </form>

      <CaptionGeneratedList captions={captions} subject={subject} />
    </div>
  );
}

export default GenerateCaption;
