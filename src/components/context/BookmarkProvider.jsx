import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext(null);
const BASE_URL = "http://localhost:5000";

export default function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  async function getCurrentBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }

  async function createNewBookmark(newBookmark) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarkContext
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        isLoadingCurrentBookmark,
        getCurrentBookmark,
        createNewBookmark,
      }}
    >
      {children}
    </BookmarkContext>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
