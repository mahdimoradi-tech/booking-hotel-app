import Map from "../Map/Map";

function BookmarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        bookmark list
      </div>
      <Map markerLocations={[]} />
    </div>
  );
}

export default BookmarkLayout;
