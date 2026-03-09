import React, { forwardRef, ReactNode, ComponentPropsWithRef } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  href?: string;
}

type Props = ButtonProps & (
  | { href: string; } & Omit<ComponentPropsWithRef<'a'>, keyof ButtonProps>
  | { href?: never; } & Omit<ComponentPropsWithRef<'button'>, keyof ButtonProps>
);

type ButtonElement<T> = T extends { href: string } ? HTMLAnchorElement : HTMLButtonElement;

export const Button = forwardRef(<T extends Props>(
  { children, variant = 'primary', size = 'medium', icon, className = '', href, ...props }: T,
  ref: React.Ref<ButtonElement<T>>
) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      ref={ref as any}
      className={`
        button
        button--${variant}
        button--${size}
        ${className}
      `}
      href={href}
      {...(props as any)}
    >
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__text">{children}</span>
    </Component>
  );
});

Button.displayName = 'Button';
