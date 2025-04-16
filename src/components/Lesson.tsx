import React, { useState, useEffect } from 'react';
import { lessons } from '../data/lessons';
import { saveProgress } from '../services/progress';
import './Lesson.css';

const Lesson: React.FC = () => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentLesson = lessons[currentLessonIndex];
    const parallaxOffset = scrollPosition * 0.5;

    return (
        <div className="lesson-page" data-era={currentLesson.era}>
            <div 
                className="parallax-section"
                style={{
                    backgroundImage: `linear-gradient(rgba(44, 24, 16, 0.7), rgba(44, 24, 16, 0.7)), 
                                    url(${currentLesson.image})`,
                    transform: `translateY(${parallaxOffset}px)`
                }}
            >
                <div className="glass-card">
                    <h1>{currentLesson.title}</h1>
                    <div className="lesson-metadata">
                        <span>Duration: {currentLesson.duration} minutes</span>
                        <span>Level: {currentLesson.level}</span>
                    </div>
                </div>
            </div>

            <div className="lesson-content glass-card">
                <p>{currentLesson.content}</p>
                
                <div className="lesson-controls">
                    {!isCompleted ? (
                        <button 
                            className="complete-button"
                            onClick={() => {
                                setIsCompleted(true);
                                saveProgress({
                                    lessonId: `lesson-${currentLesson.id}`,
                                    completed: true
                                });
                            }}
                        >
                            Complete Lesson
                        </button>
                    ) : (
                        <button 
                            className="next-button"
                            onClick={() => {
                                if (currentLessonIndex < lessons.length - 1) {
                                    setCurrentLessonIndex(prev => prev + 1);
                                    setIsCompleted(false);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            disabled={currentLessonIndex === lessons.length - 1}
                        >
                            {currentLessonIndex === lessons.length - 1 
                                ? 'All Lessons Completed!' 
                                : 'Next Lesson'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lesson;