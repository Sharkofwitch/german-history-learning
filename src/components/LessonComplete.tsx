import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LessonComplete.css';

interface LessonCompleteProps {
  title: string;
  score?: number;
  nextLessonId?: string;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({ 
  title, 
  score = 100,
  nextLessonId 
}) => {
  return (
    <motion.div 
      className="lesson-complete-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="completion-pattern-overlay" />
      
      <motion.div 
        className="completion-card glass-morphism"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          delay: 0.2 
        }}
      >
        <motion.div 
          className="completion-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            delay: 0.5 
          }}
        >
          🎉
        </motion.div>

        <motion.h1 
          className="completion-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Lesson Complete!
        </motion.h1>

        <motion.p 
          className="completion-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          You've completed "{title}"
        </motion.p>

        <motion.div 
          className="completion-score"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="score-circle">
            <motion.div 
              className="score-number"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {score}%
            </motion.div>
            <motion.svg 
              className="score-ring"
              viewBox="0 0 100 100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
            >
              <circle cx="50" cy="50" r="45" />
            </motion.svg>
          </div>
        </motion.div>

        <motion.div 
          className="completion-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {nextLessonId ? (
            <Link to={`/lessons/${nextLessonId}`} className="action-button primary">
              Next Lesson
            </Link>
          ) : (
            <Link to="/lessons" className="action-button primary">
              Back to Lessons
            </Link>
          )}
          <Link to="/profile" className="action-button secondary">
            View Progress
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LessonComplete;