import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Mahdi",
  email: "user@gmail.com",
  password: "1234",
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  function login(email, password) {
    if ((email === FAKE_USER.email, password === FAKE_USER.password))
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
