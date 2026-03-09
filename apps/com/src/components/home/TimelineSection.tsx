import React from 'react';
import { Experience } from '../../types/experience';
import TimelineItem from './TimelineItem';

interface TimelineSectionProps {
  experiences: Experience[];
}

const TimelineSection = ({ experiences }: TimelineSectionProps) => {
  return (
    <section className="home__timeline">
      {experiences.map((experience) => (
        <TimelineItem key={experience.id} experience={experience} />
      ))}
    </section>
  );
};

export default TimelineSection;
