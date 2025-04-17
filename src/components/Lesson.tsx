import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lesson.css';

interface LessonPage {
  id: number;
  title: string;
  content: string;
  image?: string;
  type: 'text' | 'image' | 'interactive';
}

interface LessonProps {
  lesson: {
    title: string;
    subtitle: string;
    era: string;
    difficulty: string;
    estimatedTime: number;
    pages: LessonPage[];
  };
  progress: number;
  onComplete: () => void;
}

const Lesson: React.FC<LessonProps> = ({ lesson, progress, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNextPage = () => {
    if (currentPageIndex < lesson.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else {
      window.history.back();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="lesson-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="lesson-header-fixed">
            <div className="lesson-title-area">
              <motion.h1 
                className="lesson-main-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {lesson.title}
              </motion.h1>
              <motion.p
                className="lesson-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {lesson.subtitle}
              </motion.p>
            </div>

            <div className="lesson-meta">
              <span className="era-badge">{lesson.era}</span>
              <span className="difficulty-badge">{lesson.difficulty}</span>
              <span className="time-badge">{lesson.estimatedTime} min</span>
            </div>
          </motion.div>

          <motion.div className="lesson-progress-bar">
            <div className="progress-steps">
              {lesson.pages.map((page, index) => (
                <motion.div
                  key={page.id}
                  className={`progress-step ${index <= currentPageIndex ? 'active' : ''}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-title">{page.title}</div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="progress-line"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${(currentPageIndex / (lesson.pages.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <div className="lesson-content-wrapper">
            <AnimatePresence presenceAffectsLayout>
              <motion.div 
                key={currentPageIndex}
                className="lesson-card glass-morphism"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="historical-pattern-overlay" />
                
                <header className="lesson-header">
                  <motion.h1 
                    className="lesson-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {lesson.pages[currentPageIndex].title}
                  </motion.h1>
                </header>

                <motion.div 
                  className="lesson-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {lesson.pages[currentPageIndex].type === 'image' && (
                    <motion.img
                      src={lesson.pages[currentPageIndex].image}
                      alt="Historical illustration"
                      className="lesson-image"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                    />
                  )}
                  
                  <motion.div
                    className="content-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {lesson.pages[currentPageIndex].content}
                  </motion.div>

                  {lesson.pages[currentPageIndex].type === 'interactive' && (
                    <motion.div 
                      className="interactive-elements"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {/* Add interactive elements here */}
                      <div className="timeline-widget">
                        {/* Timeline content */}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div 
                  className="lesson-navigation glass-morphism"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.button 
                    className="nav-button secondary"
                    onClick={handlePreviousPage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                  
                  <div className="page-indicator">
                    {currentPageIndex + 1} / {lesson.pages.length}
                  </div>

                  <motion.button 
                    className="nav-button primary"
                    onClick={handleNextPage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentPageIndex === lesson.pages.length - 1 ? 'Complete' : 'Continue'}
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.div className="lesson-sidebar">
              <div className="page-overview">
                {lesson.pages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    className={`page-item ${index === currentPageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentPageIndex(index)}
                    whileHover={{ x: 5 }}
                  >
                    <span className="page-number">{index + 1}</span>
                    <span className="page-title">{page.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lesson;