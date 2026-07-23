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
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.title} />
      </div>
    </div>
  );
}

export default SingleHotel;
