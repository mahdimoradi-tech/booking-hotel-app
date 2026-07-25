import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext(null);
const BASE_URL = "http://localhost:5000";

const initialState = {
  currentBookmark: null,
  isLoading: false,
  bookmarks: [],
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("wrong action selected!!!");
  }
}

export default function BookmarkProvider({ children }) {
  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkReducer,
    initialState,
  );

  useEffect(() => {
    async function getBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in loading bookmarks",
        });
      }
    }
    getBookmarks();
  }, []);

  async function getCurrentBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in loading bookmarks",
      });
    }
  }

  async function createNewBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in loading bookmarks",
      });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in loading bookmarks",
      });
    }
  }

  return (
    <BookmarkContext
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        getCurrentBookmark,
        createNewBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
