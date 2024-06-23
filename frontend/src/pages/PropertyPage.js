import React from "react";
import { useParams } from "react-router-dom";

const PropertyPage = () => {
  const { id } = useParams();

  // Bu örnekte sabit veriler kullanıyoruz, ancak gerçek bir uygulamada API'den veri çekmeniz gerekecek
  const properties = [
    { id: "1", name: "Ev 1", description: "Güzel bir ev." },
    { id: "2", name: "Ev 2", description: "Harika bir ev." },
    // Diğer evler
  ];

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <div>Ev bulunamadı.</div>;
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyPage;



