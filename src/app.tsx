import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import { initializeFirestoreData } from './utils/initializeData';
import './App.css';

// Lazy load components with proper type annotations
const LazyComponents = {
  Welcome: React.lazy(() => import('./components/Welcome').then(module => ({ default: module.default }))),
  LessonContainer: React.lazy(() => import('./containers/LessonContainer').then(module => ({ default: module.default }))),
  Quiz: React.lazy(() => import('./components/Quiz').then(module => ({ default: module.default }))),
  UserProfile: React.lazy(() => import('./components/UserProfile').then(module => ({ default: module.default }))),
  Login: React.lazy(() => import('./components/Login').then(module => ({ default: module.default })))
} as const; // Make the object readonly

// Types with better definitions
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

interface RouteConfig {
  path: string;
  element: JSX.Element; // More specific type
  protected?: boolean;
  title?: string;
}

// Improved Protected Route Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Improved route configurations with better type safety
const routes: ReadonlyArray<RouteConfig> = [
  {
    path: '/login',
    element: <Suspense fallback={<LoadingSpinner />}><LazyComponents.Login /></Suspense>,
    title: 'Login'
  },
  {
    path: '/',
    element: <Suspense fallback={<LoadingSpinner />}><LazyComponents.Welcome /></Suspense>,
    title: 'Welcome'
  },
  {
    path: '/lessons/*',
    element: <Suspense fallback={<LoadingSpinner />}><LazyComponents.LessonContainer /></Suspense>,
    protected: true,
    title: 'Lessons'
  },
  {
    path: '/quizzes',
    element: <Suspense fallback={<LoadingSpinner />}><LazyComponents.Quiz /></Suspense>,
    protected: true,
    title: 'Quizzes'
  },
  {
    path: '/profile',
    element: <Suspense fallback={<LoadingSpinner />}><LazyComponents.UserProfile /></Suspense>,
    protected: true,
    title: 'Profile'
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
    title: 'Not Found'
  }
];

const App: React.FC = () => {
  // Improved initialization
  useEffect(() => {
    const initializeApp = async () => {
      if (process.env.NODE_ENV !== 'development') {
        return;
      }

      try {
        await initializeFirestoreData();
        console.log('Firestore data initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Firestore data:', error);
      }
    };

    initializeApp();
  }, []);

  // Improved route rendering with better error handling
  const renderRoute = (route: RouteConfig) => {
    try {
      const element = route.protected ? (
        <ProtectedRoute>
          <ErrorBoundary key={route.path}>
            {route.element}
          </ErrorBoundary>
        </ProtectedRoute>
      ) : (
        <ErrorBoundary key={route.path}>
          {route.element}
        </ErrorBoundary>
      );

      return <Route key={route.path} path={route.path} element={element} />;
    } catch (error) {
      console.error(`Error rendering route ${route.path}:`, error);
      return null;
    }
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                {routes.map(renderRoute)}
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;