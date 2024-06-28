// src/components/FavoritesPage.js
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const FavoritesPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Favorites</h1>
      <p>Favoriler buradadır benim favorim abişim canım abim backendde kolaylıklar dilerim</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <AiOutlineHeart size={50} color="red" />
      </div>
    </div>
  );
};

export default FavoritesPage;


