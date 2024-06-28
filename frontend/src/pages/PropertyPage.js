import React from "react";
import { useParams } from "react-router-dom";
import { rentals } from "../components/Rentals";

const PropertyPage = () => {
  const { id } = useParams();

  

  const property = rentals.find((p) => p.id == id);

  console.log(property);

  if (!property) {
    return <div>Ev bulunamadı.</div>;
  }

  return (
    <div>
      <p>Ev Bilgileri
      </p>
      <h1>{property.title}</h1>
      <img
            src={property.image}
            alt=""
            className="w-full"
          />
      <p>{property.price}</p>
    </div>
  );
};

export default PropertyPage;



