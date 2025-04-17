import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {isAuthenticated ? (
            <>
              <Link
                to="/lessons"
                className={`nav-link ${location.pathname === '/lessons' ? 'active' : ''}`}
              >
                Lessons
              </Link>
              <Link
                to="/quizzes"
                className={`nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}
              >
                Quizzes
              </Link>
              <Link
                to="/profile"
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                Profile
              </Link>
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </>
          ) : (
            location.pathname !== '/login' && (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;