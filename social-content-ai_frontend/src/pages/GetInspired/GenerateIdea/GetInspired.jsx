import React, { useState } from 'react';
import api from '../../../config/axios';
import './GetInspired.scss';
import { IoArrowForwardSharp } from 'react-icons/io5';

function GetInspired({ onIdeaClick, ideas, setIdeas }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateIdeas = async (e) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);

    try {
      const response = await api.post("/api/content/get-post-ideas", { topic });
      setIdeas(response.data.ideas); 
    } catch (error) {
      console.error("Error generating post ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="getInspired">
      <h1>Get Inspired</h1>
      <span>
        Stuck staring at a blank page? Tell us what topic you have in mind and
        Skipli AI will generate a list of post ideas and captions for you.
      </span>
      <form onSubmit={handleGenerateIdeas}>
        <div className="generateCaption__field">
          <label>What topic do you want ideas for?</label>
          <input
            type="text"
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <button className="generateCaption__btn" type="submit">
          {loading ? 'Generating ideas...' : 'Generate ideas'}
        </button>
      </form>

      {ideas.length > 0 && (
        <div className="ideasList">
          <h2>Choose an idea to build some posts:</h2>
          {ideas.map((idea, index) => (
            <div
              className="idea__card"
              key={index}
              onClick={() => onIdeaClick(idea)}
            >
              {idea}
              <span className="arrow-icon"><IoArrowForwardSharp size={20}/></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetInspired;
