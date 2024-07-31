import React from "react";

import writer from "../../assets/image/writer.png";
import creativity from "../../assets/image/creativity.png";

import "./ServiceDashboard.scss";
import ServiceCard from "../../components/ServiceComponent/ServiceCard/ServiceCard";

function ServiceDashboard() {
  return (
    <div className="service">
      <h1 className="service__header">
        Generate post ideas and captions in seconds
      </h1>

      <div className="service__body">
        <ServiceCard
          to="/start-from-scratch"
          imgSrc={writer}
          heading="Start from scratch"
          description="Generate new captions to engage, delight, or sell"
        />

        <ServiceCard
          to="/combined-steps"
          imgSrc={creativity}
          heading="Get inspired"
          description="Generate post ideas and captions for a topic"
        />
      </div>
    </div>
  );
}

export default ServiceDashboard;
