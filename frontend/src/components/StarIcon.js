import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {BsStarFill, BsStar} from "react-icons/bs";
import axios from "axios";
import {favoritesUrl} from "../urls";

export const StarIcon = ({propertyId}) => {
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();

  const [isFavorite, setIsFavorite] = useState(false);

  const userId =
    JSON.parse(sessionStorage.getItem("mybnb-user"))?.user_id || "";

  const getFavorites = () => {
    if (userId) {
      axios
        .get(favoritesUrl + "/" + userId)
        .then((response) => {
          const favorites = response.data;
          if (favorites) {
            const isFound = favorites.find((f) => f.property_id == propertyId);
            isFound ? setIsFavorite(isFound) : setIsFavorite(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const addToFavorites = () => {
    const userId = JSON.parse(sessionStorage.getItem("mybnb-user")).user_id;
    axios
      .post(favoritesUrl + "/add", {userId: userId, propertyId: propertyId})
      .then((response) => {})
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  const removeFromFavorites = () => {
    const userId = JSON.parse(sessionStorage.getItem("mybnb-user")).user_id;
    axios
      .delete(favoritesUrl + "/remove", {
        data: {userId: userId, propertyId: propertyId},
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  useEffect(() => {
    setIsClicked(false);
    if (location.pathname === "/favorites") {
      setIsFavorite(true);
    }
  }, [location.pathname]);

  const handleClick = () => {
    if (isClicked || isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick} style={{cursor: "pointer"}}>
      {userId ? (
        isClicked || isFavorite ? (
          <BsStarFill style={{color: "#FFA500", fontSize: "24px"}} />
        ) : (
          <BsStar style={{color: "#FFA500", fontSize: "24px"}} />
        )
      ) : (
        ""
      )}
    </div>
  );
};
