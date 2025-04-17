import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LessonsOverview from '../components/LessonsOverview';
import Lesson from '../components/Lesson';
import LessonComplete from '../components/LessonComplete';

const LessonContainer: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LessonsOverview />} />
      <Route path="/:lessonId" element={<Lesson />} />
      <Route path="/:lessonId/complete" element={<LessonComplete />} />
    </Routes>
  );
};

export default LessonContainer;