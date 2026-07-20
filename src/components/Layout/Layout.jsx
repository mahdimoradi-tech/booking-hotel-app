import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div>
      <Toaster />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
