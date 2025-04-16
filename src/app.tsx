import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lesson from './components/Lesson';
import Quiz from './components/Quiz';
import { UserProfile } from './components/UserProfile';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <ProgressBar progress={50} />
                <Routes>
                    <Route path="/lessons" element={<Lesson />} />
                    <Route path="/quizzes" element={<Quiz />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/" element={
                        <h1>Welcome to German History Learning</h1>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;