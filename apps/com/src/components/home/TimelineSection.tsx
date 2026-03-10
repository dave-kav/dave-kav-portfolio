import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types/experience';
import TimelineItem from './TimelineItem';

interface TimelineSectionProps {
  items: TimelineItemType[];
}

const TimelineSection = ({ items }: TimelineSectionProps) => {
  return (
    <section className="home__timeline">
      {items.map((item) => (
        <TimelineItem key={`${item.type}-${item.id}`} item={item} />
      ))}
    </section>
  );
};

export default TimelineSection;
