import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseLanding } from './components/course/CourseLanding';
import { LessonContainer } from './components/lesson/LessonContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseLanding />} />
        <Route path="/lesson/:lessonId" element={<LessonContainer />} />
      </Routes>
    </Router>
  );
}

export default App;