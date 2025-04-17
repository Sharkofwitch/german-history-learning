import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz as QuizType, quizzes } from '../data/content';
import { DatabaseService } from '../services/databaseService';
import './Quiz.css';
import { useAuth } from '../contexts/AuthContext';

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="spinner"
    />
    Loading...
  </div>
);

const Quiz: React.FC = () => {
  const [currentQuiz, setCurrentQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (currentQuiz && answerIndex === currentQuiz.questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      handleQuizComplete(score);
      setCurrentQuiz(null);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (user && currentQuiz) {
      try {
        await DatabaseService.saveQuizResult(user.uid, currentQuiz.id, score);
        // Update user profile stats
        const userStats = await DatabaseService.getUserProfile(user.uid);
        if (userStats) {
          await DatabaseService.updateUserProfile(user.uid, {
            quizzesTaken: userStats.quizzesTaken + 1,
            perfectQuizzes: score === 100 ? userStats.perfectQuizzes + 1 : userStats.perfectQuizzes
          });
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }
  };

  // Quiz selection view
  if (!currentQuiz) {
    return (
      <motion.div 
        className="quiz-selection"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="historical-pattern-overlay" />
        <motion.h1 
          className="quiz-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Choose Your Challenge
        </motion.h1>
        <motion.div 
          className="quiz-grid"
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
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              className="quiz-card glass-morphism"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
              }}
              onClick={() => setCurrentQuiz(quiz)}
            >
              <div className="quiz-card-content">
                <span className="quiz-icon">📜</span>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <motion.span 
                  className={`difficulty ${quiz.difficulty}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {quiz.difficulty}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // Quiz gameplay view
  return (
    <motion.div 
      className="quiz-gameplay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="quiz-header glass-morphism">
        <h2>{currentQuiz.title}</h2>
        <div className="quiz-progress">
          <div className="progress-text">
            Question {currentQuestion + 1} of {currentQuiz.questions.length}
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key={currentQuestion}
          className="question-card glass-morphism"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="question-text">
            {currentQuiz.questions[currentQuestion].question}
          </h3>
          
          <div className="answers-grid">
            {currentQuiz.questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                className={`answer-option ${
                  selectedAnswer === index 
                    ? index === currentQuiz.questions[currentQuestion].correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {showExplanation && (
            <motion.div
              className="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{currentQuiz.questions[currentQuestion].explanation}</p>
              <motion.button
                className="next-button"
                onClick={handleNextQuestion}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;