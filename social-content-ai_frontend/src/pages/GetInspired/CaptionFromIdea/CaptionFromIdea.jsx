import React, { useState } from 'react';
import { Button } from 'antd';
import './CaptionFromIdea.scss';
import { IoIosArrowBack } from 'react-icons/io';
import api from '../../../config/axios';

function CaptionFromIdea({ idea, onBack }) {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateCaptions = async (e) => {
    e.preventDefault();
    if (!idea) return;

    setLoading(true);

    try {
      const response = await api.post("/api/content/create-captions-from-ideas", { idea });
      setCaptions(response.data.captions);
    } catch (error) {
      console.error("Error creating captions from idea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="captionFromIdea">
      <Button onClick={onBack} icon={<IoIosArrowBack />}>
        Back to Ideas
      </Button>
      <h1>Create Captions</h1>
      <form onSubmit={handleGenerateCaptions}>
        <div className="generateCaption__field">
          <label>Your Idea</label>
          <input
            type="text"
            value={idea}
            readOnly
            placeholder="Enter or edit your idea"
          />
        </div>
        <button className="generateCaption__btn" type="submit" disabled={loading}>
          {loading ? 'Creating caption...' : 'Create caption'}
        </button>
      </form>

      {captions.length > 0 && (
        <div className="captionsList">
          <h2>List of Captions:</h2>
          {captions.map((caption, index) => (
            <div className="caption__card" key={index}>{caption}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CaptionFromIdea;
