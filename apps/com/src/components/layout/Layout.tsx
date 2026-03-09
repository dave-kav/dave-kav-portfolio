import React, { FC, ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { BackToTop } from '../ui/BackToTop';
import { useLocation } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
      <Footer />
      {isHomePage && <BackToTop />}
    </div>
  );
};
