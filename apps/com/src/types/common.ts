export interface SocialLinks {
  github: string;
  linkedin: string;
  substack: string;
  email: string;
}

export type ScrollDirection = 'up' | 'down';

export interface ScrollPosition {
  x: number;
  y: number;
  lastY: number;
  direction: ScrollDirection;
}

export interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}
