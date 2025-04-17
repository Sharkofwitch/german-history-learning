import React from 'react';
import { motion } from 'framer-motion';
import './UserProfile.css';

const achievements = [
  {
    id: 'medieval-master',
    title: 'Medieval Master',
    description: 'Completed all Medieval era lessons',
    icon: '🏰',
    unlocked: true
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: '7 day streak of learning',
    icon: '⚡️',
    unlocked: true
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Scored 100% on 5 quizzes',
    icon: '🏆',
    unlocked: false
  }
];

export const UserProfile: React.FC = () => {
  const userStats = {
    lessonsCompleted: 15,
    quizzesTaken: 8,
    averageScore: 85,
    streak: 7
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="profile-header glass-morphism"
        variants={itemVariants}
      >
        <div className="profile-banner">
          <div className="historical-pattern"></div>
        </div>
        <motion.div 
          className="profile-avatar"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          👤
        </motion.div>
        <motion.h1 
          className="profile-name"
          variants={itemVariants}
        >
          John Doe
        </motion.h1>
        <p className="profile-title">History Enthusiast</p>
        <div className="profile-level">
          <div className="level-bar">
            <motion.div 
              className="level-progress"
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <span className="level-text">Level 7</span>
        </div>
      </motion.div>

      <motion.div 
        className="stats-grid"
        variants={containerVariants}
      >
        {Object.entries(userStats).map(([key, value], index) => (
          <motion.div
            key={key}
            className="stat-card glass-morphism"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
            }}
          >
            <span className="stat-number">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {value}
              </motion.span>
            </span>
            <span className="stat-label">
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="achievements-section"
        variants={itemVariants}
      >
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`achievement-card glass-morphism ${!achievement.unlocked ? 'locked' : ''}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
              }}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};