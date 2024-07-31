import React, { useState } from 'react';
import { Steps } from 'antd';
import GetInspired from './GenerateIdea/GetInspired';
import './CombinedSteps.scss';
import CaptionFromIdea from './CaptionFromIdea/CaptionFromIdea';

const { Step } = Steps;

function CombinedSteps() {
  const [current, setCurrent] = useState(0);
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState([]);

  const handleIdeaClick = (selectedIdea) => {
    setIdea(selectedIdea);
    setCurrent(1); 
  };

  return (
    <div className="combinedSteps">
      <Steps current={current} size="small">
        <Step title="Generate ideas" />
        <Step title="Create caption" />
      </Steps>

      {current === 0 && (
        <GetInspired 
          onIdeaClick={handleIdeaClick}
          ideas={ideas}
          setIdeas={setIdeas}
        />
      )}

      {current === 1 && idea && (
        <CaptionFromIdea
          idea={idea}
          onBack={() => setCurrent(0)}
        />
      )}
    </div>
  );
}

export default CombinedSteps;
