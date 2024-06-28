import React, {useEffect, useState} from "react";

import {BiUser} from "react-icons/bi";
import {FiSearch} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Navbar = ({onSearch}) => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

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

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onSigninClick = () => {
    navigate("/signin");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const onFavoritesClick = () => {
    navigate("/favorites");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mybnb-user");
    setUserData(null); // Kullanıcıyı null yaparak state'i güncelle
    onCloseModal();
    navigate("/");
    window.location.reload();
  };

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
    onSearch(searchValue);
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12">
        <div
          className="h-20 flex"
          onClick={goToHomePage}
          style={{cursor: "pointer"}}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo1.png`}
            className="object-cover"
            alt="Logo"
          />
        </div>

        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full">
          <input
            value={searchValue}
            onChange={(event) => handleSearch(event.target.value)}
            type="search"
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />

          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div>

        {userData ? (
          <>
            <div
              onClick={onFavoritesClick}
              className="mx-3 text-gray-600 hover:text-black cursor-pointer">
              Favorites
            </div>

            <div className="flex items-center pr-3 font-semibold text-gray-600">
              <div
                onClick={onOpenModal}
                className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
                <p>
                  {userData.first_name} {userData.last_name}
                </p>
                <BiUser className="text-[22px]" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center pr-3 font-semibold text-gray-600">
            <div
              onClick={onSigninClick}
              className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
              <p>Sign in</p>
              <BiUser className="text-[22px]" />
            </div>
          </div>
        )}
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="p-5">
          <h2 className="text-xl mb-4">User Information</h2>
          {userData && (
            <div className="space-y-2">
              <p>
                <strong>First Name:</strong> {userData.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.last_name}
              </p>
              <p>
                <strong>Phone Number:</strong> {userData.phone_number}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Birth Date:</strong> {userData.birth_date}
              </p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                navigate("/bookings");
                onCloseModal();
              }}
              className="mr-2 py-2 px-4 bg-blue-500 text-white rounded">
              Go to Bookings
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
