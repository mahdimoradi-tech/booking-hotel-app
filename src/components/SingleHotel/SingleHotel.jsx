import { useParams } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getCurrentHotel, currentHotel, isLoadingCurrentHotel } = useHotels();

  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel || !currentHotel) return <p>Loading...</p>;

  return (
    <div className="single-hotel">
      <h2 className="single-hotel__title">{currentHotel.name}</h2>
      <div className="single-hotel__meta">
        {currentHotel.number_of_reviews} reviews &bull;{" "}
        {currentHotel.smart_location}
      </div>
      <img
        className="single-hotel__image"
        src={currentHotel.xl_picture_url}
        alt={currentHotel.name}
      />
    </div>
  );
}

export default SingleHotel;
