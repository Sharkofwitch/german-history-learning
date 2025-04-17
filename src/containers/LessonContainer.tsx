import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Lesson from '../components/Lesson';
import LessonComplete from '../components/LessonComplete';

// Sample lesson data matching the LessonProps interface
const sampleLesson = {
  title: "The Rise of Prussia",
  subtitle: "Emergence of a European Power",
  era: "Early Modern",
  difficulty: "beginner",
  estimatedTime: 20,
  pages: [
    {
      id: 1,
      title: "Prussia's Beginning",
      type: "text" as const,
      content: `In the 18th century, Prussia emerged as a major European power 
               under the leadership of Frederick the Great. During his reign from 
               1740 to 1786, Prussia expanded its territory and modernized its 
               military and administrative systems.`
    },
    {
      id: 2,
      title: "Military Reforms",
      type: "image" as const,
      content: "Frederick the Great revolutionized the Prussian military, creating one of Europe's most disciplined armies.",
      image: "../assets/Prussian_Army_during_battle_of_Mollwitz_1741.jpg"
      
    },
    {
      id: 3,
      title: "Cultural Development",
      type: "interactive" as const,
      content: "Under Frederick's rule, Prussia became a center of the Enlightenment in Germany."
    }
  ],
  nextLessonId: 'medieval-germany'
};

const LessonContainer: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleComplete = () => {
    setProgress(100);
    navigate('/lessons/complete');
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <Lesson
            lesson={sampleLesson}
            progress={progress}
            onComplete={handleComplete}
          />
        }
      />
      <Route 
        path="/complete" 
        element={
          <LessonComplete
            title={sampleLesson.title}
            score={100}
            nextLessonId={sampleLesson.nextLessonId}
          />
        }
      />
    </Routes>
  );
};

export default LessonContainer;