import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import LessonContainer from './containers/LessonContainer';
import Quiz from './components/Quiz';
import { UserProfile } from './components/UserProfile';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/lessons/*" element={<LessonContainer />} />
                        <Route path="/quizzes" element={<Quiz />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;