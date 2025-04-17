import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useAuth } from '../contexts/AuthContext';
import './LessonComplete.css';

const LessonComplete: React.FC = () => {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const lesson = lessons.find(l => l.id.toString() === lessonId);
  
  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const nextLesson = lessons.find(l => l.id > lesson.id);

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
          You've completed "{lesson.title}"
        </motion.p>

        <motion.div 
          className="completion-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {nextLesson ? (
            <Link to={`/lessons/${nextLesson.id}`} className="action-button primary">
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