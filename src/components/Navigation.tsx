import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navigation ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="logo-svg" viewBox="0 0 50 50">
              <circle className="logo-circle" cx="25" cy="25" r="23" />
              <text 
                x="50%" 
                y="50%" 
                className="logo-text" 
                dominantBaseline="middle" 
                textAnchor="middle"
              >
                GH
              </text>
            </svg>
            <motion.span 
              className="nav-logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              German History
            </motion.span>
          </motion.div>
        </Link>
        
        <div className="nav-links">
          {[
            { path: '/lessons', label: 'Lessons' },
            { path: '/quizzes', label: 'Quizzes' },
            { path: '/profile', label: 'Profile' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;