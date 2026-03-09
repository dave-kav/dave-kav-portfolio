import { useState, useEffect } from 'react';
import { ScrollPosition } from '../types/common';

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    lastY: 0,
    direction: 'up'
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollPosition(prev => ({
            x: window.scrollX,
            y: currentY,
            lastY: prev.y,
            direction: currentY > prev.y ? 'down' : 'up'
          }));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};
