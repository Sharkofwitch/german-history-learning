import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '../data/lessons';
import { Lesson as LessonType } from '../types/lesson';
import { DatabaseService } from '../services/databaseService';
import './Lesson.css';
import { useAuth } from '../contexts/AuthContext';

const Lesson: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAuth();
  const lesson = lessons.find(l => l.id.toString() === lessonId) as LessonType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lesson?.pages && currentPage >= lesson.pages.length) {
      setCurrentPage(0);
    }
  }, [lessonId, lesson, currentPage]);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  // Initialize pages if they don't exist
  const pages = lesson.pages || [{
    type: 'text',
    content: lesson.content
  }];

  const handleComplete = async () => {
    if (user) {
      try {
        await DatabaseService.updateProgress(user.uid, lessonId!, true);
        navigate(`/lessons/${lessonId}/complete`);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const LoadingSpinner: React.FC = () => (
    <div className="loading-spinner">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="spinner"
      />
      Loading...
    </div>
  );

  return (
    <motion.div 
      className="lesson-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lesson-header">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {lesson.title}
        </motion.h1>
        <motion.div 
          className="lesson-progress"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentPage + 1) / pages.length }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPage}
          className="lesson-content glass-morphism"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          {pages[currentPage].type === 'image' && pages[currentPage].image && (
            <motion.img
              src={pages[currentPage].image}
              alt="Lesson illustration"
              className="lesson-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          )}

          <div className="lesson-text">
            {pages[currentPage].content}
          </div>

          <div className="lesson-navigation">
            <motion.button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-button secondary"
            >
              Previous
            </motion.button>
            <span className="page-indicator">{currentPage + 1} / {pages.length}</span>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-button primary"
            >
              {currentPage === pages.length - 1 ? 'Complete' : 'Next'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Lesson;