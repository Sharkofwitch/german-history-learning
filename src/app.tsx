import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import { UserProfile } from './components/UserProfile';
import ProgressBar from './components/ProgressBar';
import { getAllProgress } from './services/progress';
import './App.css';

const App: React.FC = () => {
    const progress = getAllProgress();
    const totalProgress = Math.round(
        (progress.filter(p => p.completed).length / (progress.length || 1)) * 100
    );

    return (
        <Router>
            <div className="app">
                <Navigation />
                <ProgressBar progress={totalProgress} />
                <main className="main-content">
                    <Routes>
                        <Route path="/lessons" element={<Lesson />} />
                        <Route path="/quizzes" element={<Quiz />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/" element={
                            <div className="welcome">
                                <h1>Welcome to German History Learning</h1>
                                <p>Choose from the navigation above to start learning:</p>
                                <div className="welcome-buttons">
                                    <Link to="/lessons" className="welcome-button lessons">
                                        Start Learning
                                    </Link>
                                    <Link to="/quizzes" className="welcome-button quizzes">
                                        Take a Quiz
                                    </Link>
                                </div>
                            </div>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;