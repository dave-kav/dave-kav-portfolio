import React from 'react';
import { Experience } from '../../types/experience';

interface TimelineItemProps {
  experience: Experience;
}

const TimelineItem = ({ experience }: TimelineItemProps) => {
  return (
    <div className="home__timeline-item">
      <img src={experience.logo} alt={experience.company} className="home__timeline-logo" />
      <div className="home__timeline-content">
        <h4>{experience.company}</h4>
        <p className="role">{experience.role}</p>
        <p>{experience.description}</p>
        <p className="home__tech">{experience.technologies.join(' · ')}</p>
      </div>
      <div className="home__timeline-year">{experience.period}</div>
    </div>
  );
};

export default TimelineItem;
