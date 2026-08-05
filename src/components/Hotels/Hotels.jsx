import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import { IoLocationOutline } from "react-icons/io5";

export default function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="hotel-list">
      <h2 className="hotel-list__title">Search Results ({hotels.length})</h2>
      <div className="hotel-list__grid">
        {hotels.map((item) => (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            className="hotel-list__link"
          >
            <article
              className={`hotel-card ${
                item.id === currentHotel?.id ? "hotel-card--active" : ""
              }`}
            >
              <div className="hotel-card__image-wrapper">
                <img
                  className="hotel-card__image"
                  src={item.medium_url}
                  alt={item.name}
                />
                <span className="hotel-card__badge">{item.room_type}</span>
              </div>

              <div className="hotel-card__content">
                <div className="hotel-card__info">
                  <div className="hotel-card__details">
                    <h3 className="hotel-card__title">{item.name}</h3>
                    <span className="hotel-card__location">
                      <IoLocationOutline className="hotel-card__location-icon" />
                      <p className="hotel-card__location-text">
                        {item.smart_location}
                      </p>
                    </span>
                  </div>
                </div>

                <div className="hotel-card__review">
                  <div className="hotel-card__price">
                    <h3 className="hotel-card__price-number">€{item.price}</h3>
                    <span className="hotel-card__time">/night</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}