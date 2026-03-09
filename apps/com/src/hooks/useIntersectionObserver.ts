import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false
  }: IntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = elementRef?.current;
    const frozen = entry?.isIntersecting && freezeOnceVisible;

    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => setEntry(entry),
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, entry?.isIntersecting]);

  return entry;
};
