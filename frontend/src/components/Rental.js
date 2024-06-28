import React, {useEffect, useState} from "react";
import {BsStarFill, BsStar} from "react-icons/bs";
import {useLocation, useNavigate} from "react-router-dom";
import {Modal} from "react-responsive-modal";
import axios from "axios";
import {bookingUrl, paymentUrl} from "../urls";
import {StarIcon} from "./StarIcon";

const Rental = ({
  property_id,
  property_name,
  category,
  city,
  district,
  image,
  description,
  room_count,
  bed_count,
  price,
}) => {
  const [open, setOpen] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [userData, setUserData] = useState(null);


  const location = useLocation();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenBookingModal = () => setBookingModalOpen(true);
  const onCloseBookingModal = () => setBookingModalOpen(false);


  useEffect(() => {
    const updateUserFromSessionStorage = () => {
      const user = JSON.parse(sessionStorage.getItem("mybnb-user"));
      if (user) {
        setUserData(user);
      } else {
        setUserData(null); // Eğer kullanıcı session'dan silinmişse null yap
      }
    };

    // İlk render'da çalışır
    updateUserFromSessionStorage();

    // sessionStorage'deki değişiklikleri izler
    window.addEventListener("storage", updateUserFromSessionStorage);

    // useEffect temizleyicisi, component unmount olduğunda event listener'ı kaldırır
    return () => {
      window.removeEventListener("storage", updateUserFromSessionStorage);
    };
  }, []);

  const handlePaymentAndBooking = () => {
    const userId = JSON.parse(sessionStorage.getItem("mybnb-user")).user_id;

    const paymentPayload = {
      userId: userId,
      amount: price,
    };

    const bookingPayload = {
      userId: userId,
      propertyId: property_id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    axios
      .post(`${paymentUrl}/property/${property_id}/pay`, paymentPayload)
      .then((response) => {
        axios
          .post(`${bookingUrl}/property/${property_id}/book`, bookingPayload)
          .then((response) => {
            alert("Randevu BAŞARILI!");
            onCloseBookingModal();
            onCloseModal();
          })
          .catch((error) => {
            alert("Randevu Başarısız: " + error.message);
          });
      })
      .catch((error) => {
        alert("Ödeme Başarısız: " + error.message);
      });
  };

  return (
    <div className="">
      <div onClick={onOpenModal} className="relative">
        <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
        <div className="flex  ">
          {/* Background */}
          <img
            src={`${process.env.PUBLIC_URL}/assets/property-images/${property_id}.jpeg`}
            alt=""
            className="object-cover rounded-[1.3rem] sm:h-[17rem]  md:h-[13rem] w-full"
          />
          {/* Title */}
          <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
            {property_name}
            <span>&#x2022;</span>
            <p className="text-[18px] text-slate-200"> ${price}</p>
          </div>
        </div>
      </div>

      <div className="pt-3 flex justify-between items-start">
        <div className="">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            {description}
          </p>
          <p className="max-w-[17rem] font-semibold text-[17px]">
            Rooms : {room_count}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          <StarIcon propertyId={property_id} />
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="p-5">
          <h2 className="text-xl mb-4">{property_name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/property-images/${property_id}.jpeg`}
                alt={property_name}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div>
              <p>
                <strong>City:</strong> {city}
              </p>
              <p>
                <strong>District:</strong> {district}
              </p>
              <p>
                <strong>Category:</strong> {category}
              </p>
              <p>
                <strong>Room Count:</strong> {room_count}
              </p>
              <p>
                <strong>Bed Count:</strong> {bed_count}
              </p>
              <p>
                <strong>Price:</strong> {price}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
              <button
                onClick={onOpenBookingModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={bookingModalOpen} onClose={onCloseBookingModal} center>
        <div className="p-5">
          <h2 className="text-xl mb-4">{property_name}</h2>
          <p>
            <strong>Price:</strong> {price}
          </p>
          <div className="mt-4">
            <label htmlFor="checkin">Chekin Date:</label>
            <input
              value={checkInDate}
              onChange={(event) => setCheckInDate(event.target.value)}
              type="text"
              id="checkin"
              name="checkin"
              placeholder="Enter your checkin (YYYY-MM-DD)"
              className="border px-3 py-2 rounded-md mt-1 w-full"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="checkout">Checkout Date:</label>
            <input
              value={checkOutDate}
              onChange={(event) => setCheckOutDate(event.target.value)}
              type="text"
              id="checkout"
              name="checkout"
              placeholder="Enter your checkout (YYYY-MM-DD)"
              className="border px-3 py-2 rounded-md mt-1 w-full"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="creditCard">Credit Card:</label>
            <input
              type="text"
              id="creditCard"
              name="creditCard"
              placeholder="Enter your credit card number"
              className="border px-3 py-2 rounded-md mt-1 w-full"
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handlePaymentAndBooking}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
              Pay & Book
            </button>
            <button
              onClick={onCloseBookingModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Rental;
