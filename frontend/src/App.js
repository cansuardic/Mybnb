import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage'; 
import NotFoundPage from './pages/NotFoundPage';
import PropertyPage from './pages/PropertyPage'; // Yeni PropertyPage bileşeni


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} /> 
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="*" element ={<NotFoundPage/>} /> {/* 404 sayfası */}
        <Route path="/property/:id" element={<PropertyPage />} /> {/* Yeni rota */}
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
