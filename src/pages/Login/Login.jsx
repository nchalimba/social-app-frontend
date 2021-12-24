import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "../../components/misc/Alert";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import loginRequest from "../../utils/Login";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/Styles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    console.log("clicked");
    setError(null);
    setLoading(true);
    e.preventDefault();
    try {
      const payload = await loginRequest(email, password);
      dispatch(login(payload));
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.login} container`}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <h3 className={styles.logo}>Nicos Social</h3>
          <span className={`${styles.description} textMuted`}>
            A sample social media application
          </span>
        </div>
        <div className={styles.right}>
          <form className={styles.box} onSubmit={handleClick}>
            <input
              type="email"
              className="textInput"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="textInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength="6"
            />
            <button className="btn btnPrimary">Log In</button>
            {loading && <CircularProgress color="primary" />}
            <Link style={linkStyle} to="/">
              <span className={`${styles.link} btn`}>Forgot Password?</span>
            </Link>
            <Link style={linkStyle} to="/register">
              <button className={`${styles.link} btn btnPrimary`}>
                Create New Account
              </button>
            </Link>
          </form>
          {error && (
            <Alert
              isOpen={error ? true : false}
              severity="error"
              setState={setError}
            >
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
