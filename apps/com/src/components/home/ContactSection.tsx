import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="home__contact">
      <h2 className="home__contact-cta">Let's work together.</h2>
      <div className="home__contact-links">
        <a href="mailto:work@dave-kav.com">Email</a>
        <a href="https://github.com/dave-kav" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/dave-kav" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link to="/blogs">Blog</Link>
      </div>
    </section>
  );
};

export default ContactSection;
