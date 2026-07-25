import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: LocationList,
      },
      {
        path: "/hotels",
        Component: AppLayout,
        children: [
          { index: true, Component: Hotels },
          {
            path: ":id",
            Component: SingleHotel,
          },
        ],
      },
      {
        path: "/bookmark",
        Component: BookmarkLayout,
        children: [
          {
            index: true,
            Component: Bookmarks,
          },
          {
            path: ":id",
            Component: SingleBookmark,
          },
          {
            path: "add",
            Component: AddNewBookmark,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
