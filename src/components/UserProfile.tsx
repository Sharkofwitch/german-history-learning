import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Achievement, AchievementService, UserStats } from '../services/achievementService';
import { DatabaseService } from '../services/databaseService';
import { formatRelativeTime } from '../utils/dateFormatter';
import LoadingSpinner from './LoadingSpinner';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const achievementService = new AchievementService();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          let userStats = await DatabaseService.getUserProfile(user.uid);
          
          if (!userStats) {
            const initialStats: UserStats = {
              lessonsCompleted: 0,
              quizzesTaken: 0,
              averageScore: 0,
              streak: 0,
              perfectQuizzes: 0,
              totalLessonsAvailable: 20,
              lastUpdated: new Date().toISOString()
            };
            await DatabaseService.createUserProfile(user.uid, initialStats);
            userStats = initialStats;
          }

          // Get progress data
          const progress = await DatabaseService.getProgress(user.uid);
          const quizResults = await DatabaseService.getQuizResults(user.uid);

          // Update stats with actual data
          userStats.lessonsCompleted = progress.filter(p => p.completed).length;
          userStats.quizzesTaken = quizResults.length;
          userStats.perfectQuizzes = quizResults.filter(r => r.score === 100).length;
          userStats.averageScore = quizResults.length > 0 
            ? quizResults.reduce((acc, curr) => acc + curr.score, 0) / quizResults.length 
            : 0;

          setStats(userStats);
          setAchievements(achievementService.getAllAchievements());
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const calculateLevel = (stats: UserStats | null): number => {
    return stats ? Math.floor(stats.lessonsCompleted / 5) + 1 : 1;
  };

  const calculateProgress = (stats: UserStats | null): number => {
    if (!stats) return 0;
    const currentLevelLessons = stats.lessonsCompleted % 5;
    return (currentLevelLessons / 5) * 100;
  };

  const renderLastUpdated = () => {
    if (!stats?.lastUpdated) return null;

    return (
      <div className="last-updated">
        <span className="label">Zuletzt aktualisiert: </span>
        <span className="value">{formatRelativeTime(stats.lastUpdated)}</span>
      </div>
    );
  };

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Dein Profil</h2>
        {renderLastUpdated()}
      </div>
      <motion.div 
        className="profile-container"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div
          className="profile-header glass-morphism"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <div className="profile-banner">
            <div className="historical-pattern"></div>
          </div>
          <motion.div className="profile-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <span>{user?.displayName?.[0] || '👤'}</span>
            )}
          </motion.div>
          <h1 className="profile-name">{user?.displayName || 'History Explorer'}</h1>
          <p className="profile-title">{`Level ${calculateLevel(stats)} Scholar`}</p>
          <div className="profile-level">
            <div className="level-bar">
              <motion.div 
                className="level-progress"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress(stats)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="level-text">
              {`${stats.lessonsCompleted % 5} / 5 lessons to next level`}
            </span>
          </div>
        </motion.div>

        <motion.div 
          className="stats-grid"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {Object.entries(stats as UserStats).map(([key, value], index) => {
            if (key === 'totalLessonsAvailable' || key === 'perfectQuizzes') return null;
            return (
              <motion.div
                key={key}
                className="stat-card glass-morphism"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -5 }}
              >
                <span className="stat-number">{value as number}</span>
                <span className="stat-label">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="achievements-section"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const isUnlocked = achievement.condition(stats as UserStats);
              return (
                <motion.div
                  key={achievement.id}
                  className={`achievement-card glass-morphism ${!isUnlocked ? 'locked' : ''}`}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="achievement-icon">{achievement.icon}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  {!isUnlocked && (
                    <div className="achievement-lock">
                      <span>🔒</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfile;