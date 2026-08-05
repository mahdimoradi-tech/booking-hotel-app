import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelsProvider";

function AppLayout() {
  const { hotels } = useHotels();
  return (
    <div className="app-layout">
      <div className="app-layout__sidebar">
        <Outlet />
      </div>
      <div className="app-layout__map">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;