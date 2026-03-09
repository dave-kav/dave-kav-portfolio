import { forwardRef, ReactNode, ComponentPropsWithRef } from 'react';
import './Card.css';
import React from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'glass';

interface CardProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  children: ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        card
        card--${variant}
        ${hover ? 'card--hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
