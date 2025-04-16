import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="main-nav">
            <div className="nav-logo">
                <Link to="/">German History</Link>
            </div>
            <div className="nav-links">
                <Link to="/lessons" className={location.pathname === '/lessons' ? 'active' : ''}>
                    Lessons
                </Link>
                <Link to="/quizzes" className={location.pathname === '/quizzes' ? 'active' : ''}>
                    Quizzes
                </Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                    Profile
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;