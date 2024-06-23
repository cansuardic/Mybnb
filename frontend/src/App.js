import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage'; 
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" component={HomePage} /> {/* 'HomPage' olarak düzeltildi */}
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} /> {/* 404 sayfası */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
