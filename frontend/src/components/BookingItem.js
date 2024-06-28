import React from "react";

const BookingItem = ({
  property_id,
  property_name,
  check_in_date,
  check_out_date,
}) => {
  return (
    <div className="">
      <div className="relative">
        <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
        <div className="flex  ">
          <img
            src={`${process.env.PUBLIC_URL}/assets/property-images/${property_id}.jpeg`}
            alt=""
            className="object-cover rounded-[1.3rem] sm:h-[17rem]  md:h-[13rem] w-full"
          />

          <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
            {property_name}
          </div>
        </div>
      </div>

      <div className="pt-3 flex justify-between items-start">
        <div className="">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            Check-In : {check_in_date}
          </p>
          <br />

          <hr />
          <hr />

          <br />
          <p className="max-w-[17rem] font-semibold text-[17px]">
            Check-Out : {check_out_date}
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
