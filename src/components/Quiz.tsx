import React, { useState } from 'react';
import { quizzes } from '../data/quizzes';

interface QuizProps {
    questions?: typeof quizzes;
    onComplete?: (answers: any[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions = quizzes, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    if (!questions.length) {
        return <div>No questions available</div>;
    }

    const handleAnswer = (answer: string) => {
        setUserAnswers([...userAnswers, answer]);
        const nextQuestion = currentQuestionIndex + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else if (onComplete) {
            onComplete(userAnswers);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h2>{currentQuestion.question}</h2>
            <ul className="quiz-options">
                {currentQuestion.options.map((option, index) => (
                    <li 
                        key={index} 
                        onClick={() => handleAnswer(option.answer)}
                        className="quiz-option"
                    >
                        {option.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quiz;