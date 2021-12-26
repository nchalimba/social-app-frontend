import axios from "axios";
import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import loginRequest from "../../utils/Login";
import Alert from "../../components/misc/Alert";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/Styles";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    setError(null);
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      setPasswordConfirm("");
      return;
    }
    const user = {
      username,
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
    };
    try {
      await axios.post("/api/auth/register", user);
      //login
      const payload = await loginRequest(email, password);
      dispatch(login(payload));
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };
  return (
    <div className={`${styles.register} container`}>
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
              type="text"
              className="textInput"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              className="textInput"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="textInput"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="textInput"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
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
            <input
              type="password"
              className="textInput"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm Password"
              required
              minLength="6"
            />
            <button className="btn btnPrimary">Sign Up</button>
            <Link style={linkStyle} to="/login">
              <span className={`${styles.link} btn`}>
                Already have an account?
              </span>
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

export default Register;
