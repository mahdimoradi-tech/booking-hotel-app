import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";

function Bookmarks() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async(e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!bookmarks.length) return <div>No Bookmark Location</div>

  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" : ""}`}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => handleDelete(e, item.id)}>
                <HiTrash className="trash" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
