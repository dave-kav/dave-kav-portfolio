import { useState, useEffect, RefObject } from 'react';

export const useInView = (ref: RefObject<Element>): boolean => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.15,
      rootMargin: '-5% 0px',
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
};
