import axios from "axios";
import React, {useEffect, useState} from "react";

import Rentals from "../components/Rentals";
import {bookingUrl} from "../urls";
import BookingItem from "../components/BookingItem";

const BookingsPage = ({searchValue}) => {
  const [bookingsData, setBookingsData] = useState([]);

  const getBookings = () => {
    const userId = JSON.parse(sessionStorage.getItem("mybnb-user")).user_id;

    axios
      .get(bookingUrl + "/" + userId)
      .then((response) => {
        console.log(response);
        setBookingsData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getBookings();
  }, []);

  function formatDateToHumanReadable(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });
  }

  const filteredData =
    bookingsData.filter((item) =>
      item.property_name.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

  return (
    <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((b) => {
            return (
              <BookingItem
                property_id={b.property_id}
                property_name={b.property_name}
                check_in_date={formatDateToHumanReadable(b.check_in_date)}
                check_out_date={formatDateToHumanReadable(b.check_out_date)}
              />
            );
          })
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
