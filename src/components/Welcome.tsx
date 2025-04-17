import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Welcome.css';

const Welcome: React.FC = () => {
  const parallaxVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover German History
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            An immersive journey through time, from medieval kingdoms to modern Germany
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/lessons" className="cta-button primary">
              Begin Your Journey
            </Link>
            <Link to="/quizzes" className="cta-button secondary">
              Test Your Knowledge
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.section 
        className="features-section"
        variants={parallaxVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="features-grid">
          {[
            {
              icon: "🏰",
              title: "Interactive Lessons",
              description: "Engage with history through interactive storytelling and visualizations"
            },
            {
              icon: "📚",
              title: "Rich Content",
              description: "Explore detailed historical accounts, maps, and primary sources"
            },
            {
              icon: "🎯",
              title: "Track Progress",
              description: "Monitor your learning journey with achievements and milestones"
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="feature-card glass-morphism"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.div 
        className="historical-quote"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <blockquote>
          "Those who cannot remember the past are condemned to repeat it"
          <footer>— George Santayana</footer>
        </blockquote>
      </motion.div>
    </div>
  );
};

export default Welcome;