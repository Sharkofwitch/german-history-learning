import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DatabaseService } from '../services/databaseService';
import { Lesson } from '../types/lesson';
import './LessonsOverview.css';

const LessonsOverview: React.FC = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const fetchedLessons = await DatabaseService.getLessons();
        setLessons(fetchedLessons);
      } catch (error) {
        console.error('Error loading lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <motion.div 
      className="lessons-overview"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
    >
      <div className="historical-pattern-overlay" />
      
      <motion.h1 
        className="lessons-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        German History Journey
      </motion.h1>

      <motion.div 
        className="lessons-grid"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            className="lesson-card glass-morphism"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              y: -5,
              boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
            }}
            onClick={() => navigate(`/lessons/${lesson.id}`)}
          >
            <div className="lesson-card-image">
              <img src={lesson.image} alt={lesson.title} />
              <div className="lesson-card-overlay">
                <span className="era-badge">{lesson.era}</span>
                <span className="duration-badge">{lesson.duration} min</span>
              </div>
            </div>
            
            <div className="lesson-card-content">
              <h2>{lesson.title}</h2>
              <p>{lesson.content.substring(0, 120)}...</p>
              
              <div className="lesson-card-footer">
                <span className={`difficulty-badge ${lesson.level.toLowerCase()}`}>
                  {lesson.level}
                </span>
                <motion.button 
                  className="start-lesson-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Lesson
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LessonsOverview;