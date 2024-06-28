import React, {useEffect, useState} from "react";
import Filter from "../components/Filter";
import axios from "axios";

import Rentals from "../components/Rentals";
import {categoriesUrl, propertiesUrl} from "../urls";

const HomePage = ({searchValue}) => {
  const [clickedCategoryName, setClickedCategoryName] = useState("all");

  const [categoryData, setCategoryData] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);

  const getCategories = () => {
    axios
      .get(categoriesUrl)
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProperties = () => {
    axios
      .get(propertiesUrl)
      .then((response) => {
        setPropertiesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategories();
    getProperties();
  }, []);

  const onCategorySelected = (categoryName, categoryId) => {
    axios
      .get(propertiesUrl + "/category/" + categoryId)
      .then((response) => {
        setPropertiesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setClickedCategoryName(categoryName);
  };

  const filteredData = propertiesData.filter((item) =>
    item.property_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getFilters = () => {
    return (
      <div className="   ">
        <div className="flex flex-wrap justify-start  gap-3 sm:gap-4  mt-4  ">
          <div
            onClick={() => {
              getProperties();
              setClickedCategoryName("all");
            }}
            className={`flex items-center  hover:bg-white hover:text-[#ff5a60] duration-200 ease-out gap-2 py-1 px-3 sm:px-4 rounded-full text-[14px] sm:text-[16px] ${
              clickedCategoryName === "all"
                ? "bg-white text-[#ff5a60]"
                : "bg-[#ff5a60] text-white"
            }`}>
            All
          </div>
          {categoryData.map((d) => (
            <div
              onClick={() => onCategorySelected(d.category_name, d.category_id)}
              className={`flex items-center   hover:text-[#ff5a60] duration-200 ease-out gap-2 py-1 px-3 sm:px-4 rounded-full text-[14px] sm:text-[16px] ${
                clickedCategoryName === d.category_name
                  ? "bg-white text-[#ff5a60]"
                  : "bg-[#ff5a60] text-white"
              }`}>
              {d.category_name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
      {getFilters()}

      <Rentals rentalData={filteredData} />
    </div>
  );
};

export default HomePage;
