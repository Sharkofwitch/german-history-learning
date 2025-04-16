import React, { useState } from 'react';
import { quizzes } from '../data/quizzes';
import { saveProgress } from '../services/progress';
import './Quiz.css';

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (answer: string, isCorrect: boolean) => {
        if (isAnswered) return;
        
        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quizzes.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setIsAnswered(false);
            } else {
                setShowResults(true);
                saveProgress({
                    lessonId: `quiz-${currentQuestionIndex + 1}`,
                    completed: true,
                    score: ((score + (isCorrect ? 1 : 0)) / quizzes.length) * 100
                });
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResults(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    if (showResults) {
        return (
            <div className="quiz-container">
                <h2>Quiz Complete!</h2>
                <div className="results">
                    <p>Your Score: {score} out of {quizzes.length}</p>
                    <p>Percentage: {((score / quizzes.length) * 100).toFixed(1)}%</p>
                </div>
                <button className="restart-button" onClick={restartQuiz}>
                    Try Again
                </button>
            </div>
        );
    }

    const currentQuestion = quizzes[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Question {currentQuestionIndex + 1} of {quizzes.length}</h2>
                <p className="score">Current Score: {score}</p>
            </div>
            <div className="question">
                <h3>{currentQuestion.question}</h3>
            </div>
            <div className="options">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option.answer, option.isCorrect)}
                        className={`option-button ${
                            selectedAnswer === option.answer 
                                ? option.isCorrect 
                                    ? 'correct' 
                                    : 'incorrect'
                                : ''
                        } ${isAnswered ? 'disabled' : ''}`}
                        disabled={isAnswered}
                    >
                        {option.answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;