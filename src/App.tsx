import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseLanding } from './components/course/CourseLanding';
import { LessonContainer } from './components/lesson/LessonContainer';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<CourseLanding />} />
          <Route path="/lesson/:lessonId" element={<LessonContainer />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;