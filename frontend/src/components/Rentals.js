import React from "react";
import {useNavigate} from "react-router-dom";
import Rental from "./Rental";

const Rentals = ({rentalData}) => {
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {rentalData && rentalData.length > 0 ? (
          rentalData.map((rental) => (
            <div key={rental.property_id}>
              <Rental
                property_id={rental.property_id}
                property_name={rental.property_name}
                city={rental.city_name}
                category={rental.category_name}
                district={rental.district_name}
                image={rental.image}
                description={rental.description}
                room_count={rental.room_count}
                bed_count={rental.bed_count}
                price={rental.price}
              />
            </div>
          ))
        ) : (
          <p>No data found!</p>
        )}
      </div>
    </div>
  );
};

export default Rentals;
