import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './BackToTop.css';
import React from 'react';

export const BackToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    
    const toggleVisibility = () => {
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}; 