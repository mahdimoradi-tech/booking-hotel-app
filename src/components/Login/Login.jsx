import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="login">
      <div className="login__wrapper">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__control">
            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="login__control">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="login__actions">
            <button className="btn btn--primary login__submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
