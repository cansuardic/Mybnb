import React, {useState} from "react";
import "react-responsive-modal/styles.css";
import {Route, Routes} from "react-router-dom";
import FavoritesPage from "./components/FavoritesPage"; // Yeni eklenen bileşen
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BookingsPage from "./pages/BookingsPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage searchValue={searchValue} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage searchValue={searchValue} />}
        />
        <Route
          path="/bookings"
          element={<BookingsPage searchValue={searchValue} />}
        />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
