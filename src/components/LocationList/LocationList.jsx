import { IoLocationOutline } from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
import { HiOutlineBookmark, HiOutlineHeart } from "react-icons/hi2";

const BASE_URL = "https://booking-hotel-app-api.onrender.com";

function LocationList() {
  const { data, isLoading } = useFetch(`${BASE_URL}/hotels`, "");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <article className="hotel-card" key={item.id}>
              <div className="hotel-card__image-wrapper">
                <img
                  className="hotel-card__image"
                  src={item.medium_url}
                  alt={item.name}
                />
                <span className="hotel-card__badge badge">
                  {item.room_type}
                </span>

                <button type="button" className="hotel-card__bookmark-action">
                  <HiOutlineHeart />
                </button>
                <div className="hotel-card__stars">⭐⭐⭐</div>
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
                      <p className="hotel-card__location-code">
                        {item.country_code}
                      </p>
                    </span>
                  </div>

                  <div className="hotel-card__amenities">
                    {item.amenities.slice(0, 2).join(" • ")}
                  </div>
                </div>

                <div className="hotel-card__review">
                  <div className="hotel-card__rating">
                    <span className="hotel-card__rate">
                      {(item.review_scores_rating / 10).toFixed(1)}
                    </span>
                    <p className="hotel-card__rate-numbers">
                      {`${item.number_of_reviews} reviews`}
                    </p>
                  </div>

                  <div className="hotel-card__price">
                    <h3 className="hotel-card__price-number">${item.price}</h3>
                    <span className="hotel-card__time">/night</span>
                  </div>
                </div>
              </div>
            </article>
          );

          // return (
          //   <div className="locationItem" key={item.id}>
          //     <img src={item.medium_url} alt={item.title} />
          //     <div className="locationItemDesc">
          //       <p className="location">{item.smart_location}</p>
          //       <p className="name">{item.name}</p>
          //       <p className="location">
          //         €&nbsp;{item.price}&nbsp;
          //         <span>night</span>
          //       </p>
          //     </div>
          //   </div>
          // );
        })}
      </div>
    </div>
  );
}

export default LocationList;
