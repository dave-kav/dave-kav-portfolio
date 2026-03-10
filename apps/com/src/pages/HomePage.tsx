import React, { useMemo } from 'react';
import { useConfig } from '../hooks/useConfig';
import {
  HeroSection,
  CurrentRoleCard,
  TimelineSection,
  ContactSection,
  HomeFooter,
} from '../components/home';
import { ExperienceData, EducationData, TimelineItem } from '../types/experience';
import '../styles/home.css';

const getStartYear = (period: string): number => {
  if (period.includes('Present')) return 9999;
  const match = period.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
};

const HomePage = () => {
  const { data: expData, loading: expLoading } = useConfig<ExperienceData>('experience');
  const { data: eduData, loading: eduLoading } = useConfig<EducationData>('education');

  const experiences = expData?.experiences || [];
  const education = eduData?.education || [];
  const current = experiences[0];

  const timeline = useMemo<TimelineItem[]>(() => {
    const all: TimelineItem[] = [...experiences, ...education];
    return all.sort((a, b) => getStartYear(b.period) - getStartYear(a.period));
  }, [experiences, education]);

  if (expLoading || eduLoading || !current) {
    return (
      <main className="home">
        <HeroSection />
      </main>
    );
  }

  return (
    <main className="home">
      <HeroSection />
      <CurrentRoleCard experience={current} />
      <TimelineSection items={timeline} />
      <ContactSection />
      <HomeFooter />
    </main>
  );
};

export default HomePage;
