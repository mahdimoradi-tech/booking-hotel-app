import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthentication: false,
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
        user: FAKE_USER,
        isAuthentication: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthentication: false,
      };

    default:
  }
}

export default function AuthProvider({ children }) {
  const [{ user, isAuthentication }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  function login(email, password) {
    if ((email === FAKE_USER.email, password === FAKE_USER.password))
      dispatch({ type: "login" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext
      value={{
        user,
        isAuthentication,
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
