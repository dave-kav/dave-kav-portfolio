import React from 'react';
import { Experience } from '../../types/experience';

interface CurrentRoleCardProps {
  experience: Experience;
}

const CurrentRoleCard = ({ experience }: CurrentRoleCardProps) => {
  return (
    <section className="home__now">
      <img src={experience.logo} alt={experience.company} className="home__now-logo" />
      <div className="home__now-content">
        <h3>{experience.role} at {experience.company}</h3>
        <p>{experience.description}</p>
        <p className="home__tech">{experience.technologies.join(' · ')}</p>
      </div>
      <div className="home__now-meta">
        <span>Since</span>
        <strong>2025</strong>
      </div>
    </section>
  );
};

export default CurrentRoleCard;
