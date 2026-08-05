import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BookmarkProvider";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="app-layout">
      <div className="app-layout__sidebar">
        <Outlet />
      </div>
      <div className="app-layout__map">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;