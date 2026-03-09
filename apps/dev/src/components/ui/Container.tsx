import { ReactNode, ComponentPropsWithoutRef } from 'react';
import './Container.css';
import React from 'react';

type ContainerSize = 'default' | 'small' | 'large';

interface ContainerProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

export const Container = ({
  children,
  size = 'default',
  className = '',
  ...props
}: ContainerProps) => {
  return (
    <div
      className={`
        container
        container--${size}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
