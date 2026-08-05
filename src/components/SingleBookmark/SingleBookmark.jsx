import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import { useEffect } from "react";

function SingleBookmark() {
  const { getCurrentBookmark, currentBookmark, isLoading } = useBookmark();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <p>Loading...</p>;

  return (
    <div className="single-bookmark">
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="bookmark-card bookmark-card--single">
        <div className="bookmark-card__content">
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          <strong className="bookmark-card__city">
            {currentBookmark.cityName}
          </strong>
          <span className="bookmark-card__country">
            {currentBookmark.country}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;