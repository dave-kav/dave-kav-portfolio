import { FC } from 'react';
import { Container } from '../ui/Container';
import './Footer.css';
import React from 'react';

export const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <p className="footer__text">
            Built with React, CSS, and Claude 3.5
          </p>
          <p className="footer__copyright">
            © {currentYear} David Kavanagh. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
