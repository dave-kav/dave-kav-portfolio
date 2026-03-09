import React, { useState, useEffect, FC } from 'react';
import { Container } from '../ui/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export const Navigation: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogsPage = location.pathname === '/blogs';

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'is-scrolled' : ''}`}>
      <Container>
        <div className="navigation__inner">
          <Link to="/" className="navigation__logo" onClick={handleMobileNavigation}>
            <img 
              src="/logo.svg" 
              alt="DK Logo" 
              className="navigation__logo-image"
            />
          </Link>

          <div className="navigation__desktop">
            {!isHomePage && (
              <Link to="/" className="navigation__link">
                Home
              </Link>
            )}
            {!isBlogsPage && (
              <Link to="/blogs" className="navigation__link">
                Blog
              </Link>
            )}
            {isHomePage && (
              <>
                <a 
                  onClick={() => scrollToSection('experience')} 
                  className="navigation__link"
                >
                  Experience
                </a>
                <a 
                  onClick={() => scrollToSection('education')} 
                  className="navigation__link"
                >
                  Education
                </a>
                <a 
                  onClick={() => scrollToSection('projects')} 
                  className="navigation__link"
                >
                  Projects
                </a>
                <a 
                  onClick={() => scrollToSection('contact')} 
                  className="navigation__link"
                >
                  Contact
                </a>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="navigation__theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
            </button>
          </div>

          <div className="navigation__mobile-controls">
            <button
              onClick={toggleTheme}
              className="navigation__theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
            </button>
            <button
              className={`navigation__mobile-toggle ${isMobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </Container>

      <div className={`navigation__mobile ${isMobileMenuOpen ? 'is-open' : ''}`}>
        {!isHomePage && (
          <Link to="/" className="navigation__mobile-link" onClick={handleMobileNavigation}>
            Home
          </Link>
        )}
        {!isBlogsPage && (
          <Link to="/blogs" className="navigation__mobile-link" onClick={handleMobileNavigation}>
            Blog
          </Link>
        )}
        {isHomePage && (
          <>
            <a 
              onClick={() => scrollToSection('experience')} 
              className="navigation__mobile-link"
            >
              Experience
            </a>
            <a 
              onClick={() => scrollToSection('education')} 
              className="navigation__mobile-link"
            >
              Education
            </a>
            <a 
              onClick={() => scrollToSection('projects')} 
              className="navigation__mobile-link"
            >
              Projects
            </a>
            <a 
              onClick={() => scrollToSection('contact')} 
              className="navigation__mobile-link"
            >
              Contact
            </a>
          </>
        )}
      </div>
    </nav>
  );
};
