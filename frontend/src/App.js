import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SigninPage from './pages/SigninPage';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage'; // Yeni PropertyPage bileşeni
import FavoritesPage from './components/FavoritesPage'; // Yeni eklenen bileşen
import RegisterPage from './pages/RegisterPage'; 

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} /> 
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/property/:id" element={<PropertyPage />} /> {/* Yeni rota */}
        <Route path="/favorites" element={<FavoritesPage />} /> {/* Yeni rota */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
