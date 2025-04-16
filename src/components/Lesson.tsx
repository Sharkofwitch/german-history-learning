import React from 'react';
import { lessons } from '../data/lessons';

interface LessonProps {
    lesson?: {
        id: number;
        title: string;
        content: string;
        duration: number;
        level: string;
    };
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lesson">
            <h2>{lesson.title}</h2>
            <div className="lesson-metadata">
                <span>Duration: {lesson.duration} minutes</span>
                <span>Level: {lesson.level}</span>
            </div>
            <p>{lesson.content}</p>
        </div>
    );
};

export default Lesson;