import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";
import HotelsProvider from "../context/HotelsProvider";

function Layout() {
  return (
    <HotelsProvider>
      <div>
        <Toaster />
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </HotelsProvider>
  );
}

export default Layout;
