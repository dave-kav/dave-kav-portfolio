import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import '../styles/bento.css';

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo: string;
}

interface ExperienceData {
  experiences: Experience[];
}

const HomePage = () => {
  const { data, loading } = useConfig<ExperienceData>('experience');
  const exp = data?.experiences || [];
  const current = exp[0];


  if (loading || !current) {
    return (
      <main className="bento">
        <motion.section
          className="bento__hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            David
            <span>Kavanagh</span>
          </motion.h1>
          <motion.p
            className="bento__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Software engineer building backend systems. Based in Dublin.
          </motion.p>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="bento">
      {/* Hero */}
      <motion.section
        className="bento__hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          David
          <span>Kavanagh</span>
        </motion.h1>
        <motion.p
          className="bento__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Software engineer building backend systems. Based in Dublin.
        </motion.p>
      </motion.section>

      {/* Current role */}
      <section className="bento__now">
        <img src={current.logo} alt={current.company} className="bento__now-logo" />
        <div className="bento__now-content">
          <h3>{current.role} at {current.company}</h3>
          <p>{current.description}</p>
          <p className="bento__tech">{current.technologies.join(' · ')}</p>
        </div>
        <div className="bento__now-meta">
          <span>Since</span>
          <strong>2025</strong>
        </div>
      </section>

      {/* Timeline */}
      <section className="bento__timeline">
        {exp.slice(1, 5).map((e) => (
          <div className="bento__timeline-item" key={e.id}>
            <img src={e.logo} alt={e.company} className="bento__timeline-logo" />
            <div className="bento__timeline-content">
              <h4>{e.company}</h4>
              <p className="role">{e.role}</p>
              <p>{e.description}</p>
              <p className="bento__tech">{e.technologies.join(' · ')}</p>
            </div>
            <div className="bento__timeline-year">{e.period}</div>
          </div>
        ))}
      </section>

      {/* Contact */}
      <section className="bento__contact">
        <h2 className="bento__contact-cta">Let's work together.</h2>
        <div className="bento__contact-links">
          <a href="mailto:work@dave-kav.com">Email</a>
          <a href="https://github.com/dave-kav" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/dave-kav" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/blogs">Blog</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bento__footer">
        <span className="bento__footer-hint">Press ⌘K for options</span>
        <a href="https://e176e82e7e125f4726a76dd364ecb66b.r2.cloudflarestorage.com/dave-kav-resume/resume.pdf" target="_blank" rel="noopener noreferrer">Download CV</a>
      </footer>
    </main>
  );
};

export default HomePage;
