import axios from "axios";
import React, {useEffect, useState} from "react";

import Rentals from "../components/Rentals";
import {favoritesUrl} from "../urls";

const FavoritesPage = ({searchValue}) => {
  const [favoritesData, setFavoritesData] = useState([]);

  const getFavorites = () => {
    const userId = JSON.parse(sessionStorage.getItem("mybnb-user")).user_id;
    axios
      .get(favoritesUrl + "/" + userId)
      .then((response) => {
        setFavoritesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const filteredData = favoritesData.filter((item) =>
    item.property_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
      <Rentals rentalData={filteredData} />
    </div>
  );
};

export default FavoritesPage;
