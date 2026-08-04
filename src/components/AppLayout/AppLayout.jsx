// import { Outlet } from "react-router-dom";
// import Map from "../Map/Map";
// import { useHotels } from "../context/HotelsProvider";

// function AppLayout() {
//   const { hotels } = useHotels();
//   return (
//     <div className="appLayout">
//       <div className="sidebar">
//         <Outlet />
//       </div>
//       <Map markerLocations={hotels} />
//     </div>
//   );
// }

// export default AppLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelsProvider";
import { HiOutlineMap } from "react-icons/hi2";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

function AppLayout() {
  const { hotels } = useHotels();
  const [isMapView, setIsMapView] = useState(false);

  return (
    <div className="app-layout">
      <div
        className={`app-layout__sidebar ${
          isMapView ? "app-layout__sidebar--hidden-mobile" : ""
        }`}
      >
        <Outlet />
      </div>

      <div
        className={`app-layout__map ${
          !isMapView ? "app-layout__map--hidden-mobile" : ""
        }`}
      >
        <Map markerLocations={hotels} />
      </div>

      <button
        className="app-layout__toggle-btn"
        onClick={() => setIsMapView(!isMapView)}
      >
        {isMapView ? (
          <>
            <HiOutlineMenuAlt4 className="icon" /> List view
          </>
        ) : (
          <>
            <HiOutlineMap className="icon" /> Map view
          </>
        )}
      </button>
    </div>
  );
}

export default AppLayout;