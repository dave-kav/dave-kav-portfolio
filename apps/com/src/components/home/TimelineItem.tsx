import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types/experience';

interface TimelineItemProps {
  item: TimelineItemType;
}

const TimelineItem = ({ item }: TimelineItemProps) => {
  const isEducation = item.type === 'education';
  const title = isEducation ? item.school : item.company;
  const subtitle = isEducation ? item.degree : item.role;
  const tags = isEducation ? item.courses : item.technologies;
  const logo = item.logo;

  return (
    <div className="home__timeline-item">
      {logo && <img src={logo} alt={title} className="home__timeline-logo" />}
      <div className="home__timeline-content">
        <h4>{title}</h4>
        <p className="role">{subtitle}</p>
        <p>{item.description}</p>
        {tags && tags.length > 0 && (
          <p className="home__tech">{tags.join(' · ')}</p>
        )}
      </div>
      <div className="home__timeline-year">{item.period}</div>
    </div>
  );
};

export default TimelineItem;
