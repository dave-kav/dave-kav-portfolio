import React from 'react';
import { useConfig } from '../hooks/useConfig';
import {
  HeroSection,
  CurrentRoleCard,
  TimelineSection,
  ContactSection,
  HomeFooter,
} from '../components/home';
import { ExperienceData } from '../types/experience';
import '../styles/home.css';

const HomePage = () => {
  const { data, loading } = useConfig<ExperienceData>('experience');
  const experiences = data?.experiences || [];
  const current = experiences[0];

  if (loading || !current) {
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
      <TimelineSection experiences={experiences} />
      <ContactSection />
      <HomeFooter />
    </main>
  );
};

export default HomePage;
