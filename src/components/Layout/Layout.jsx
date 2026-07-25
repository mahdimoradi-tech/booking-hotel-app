import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";
import HotelsProvider from "../context/HotelsProvider";
import BookmarkProvider from "../context/BookmarkProvider";
import AuthProvider from "../context/AuthProvider";

function Layout() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelsProvider>
          <div>
            <Toaster />
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
        </HotelsProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default Layout;
