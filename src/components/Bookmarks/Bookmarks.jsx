import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

function Bookmarks() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!bookmarks.length) return <div>No Bookmark Location</div>;

  return (
    <div className="bookmark-list">
      <h2 className="bookmark-list__title">Bookmark List</h2>
      <div className="bookmark-list__items">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            className="bookmark-list__link"
          >
            <div
              className={`bookmark-card ${
                item.id === currentBookmark?.id ? "bookmark-card--active" : ""
              }`}
            >
              <div className="bookmark-card__content">
                <ReactCountryFlag svg countryCode={item.countryCode} />
                <strong className="bookmark-card__city">{item.cityName}</strong>
                <span className="bookmark-card__country">{item.country}</span>
              </div>
              <button
                className="bookmark-card__trash-btn"
                onClick={(e) => handleDelete(e, item.id)}
              >
                <HiTrash className="bookmark-card__trash-icon" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;