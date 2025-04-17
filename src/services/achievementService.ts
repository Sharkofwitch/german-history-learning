export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  lessonsCompleted: number;
  quizzesTaken: number;
  averageScore: number;
  streak: number;
  perfectQuizzes: number;
  totalLessonsAvailable: number;
  lastUpdated?: string; // Add this field
}

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    condition: (stats) => stats.lessonsCompleted >= 1
  },
  {
    id: 'history-buff',
    title: 'History Buff',
    description: 'Complete 10 lessons',
    icon: '📚',
    condition: (stats) => stats.lessonsCompleted >= 10
  },
  {
    id: 'perfect-score',
    title: 'Perfect Scholar',
    description: 'Get 100% on 3 quizzes',
    icon: '🏆',
    condition: (stats) => stats.perfectQuizzes >= 3
  },
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    condition: (stats) => stats.streak >= 7
  },
  {
    id: 'master-historian',
    title: 'Master Historian',
    description: 'Complete all available lessons',
    icon: '👨‍🎓',
    condition: (stats) => stats.lessonsCompleted === stats.totalLessonsAvailable
  }
];

export class AchievementService {
  getUnlockedAchievements(stats: UserStats): Achievement[] {
    return achievements.filter(achievement => achievement.condition(stats));
  }

  getAllAchievements(): Achievement[] {
    return achievements;
  }
}