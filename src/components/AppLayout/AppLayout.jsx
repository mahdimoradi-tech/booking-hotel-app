import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <h3>Map</h3>
    </div>
  );
}

export default AppLayout;
