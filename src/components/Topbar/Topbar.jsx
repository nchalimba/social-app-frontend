import React, { useState } from "react";
import styles from "./Topbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/Styles";
import axios from "axios";
import { logout } from "../../features/user";
import config from "../../config.json";
import Alert from "../../components/misc/Alert";

function Topbar() {
  const theme = useSelector((state) => state.theme.value);
  const user = useSelector((state) => state.user.value);
  const publicFolder = config.image_endpoint;

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const logoUrl =
    theme.background === "light-theme"
      ? encodeURIComponent("public/logo-light.png")
      : encodeURIComponent("public/logo-dark.png");

  const handleLogout = async () => {
    try {
      //logout
      await axios.post("/api/auth/logout");
      //clear redux state
      dispatch(logout());
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };
  return (
    <div className={styles.navWrapper}>
      <div className={styles.container + " container"}>
        <Link to="/">
          <div className={`${styles.logo} profilePhoto`}>
            <img src={publicFolder + logoUrl} alt="" />
          </div>
        </Link>
        <div className={styles.searchBar + " searchBar"}>
          <SearchIcon />
          <input type="search" placeholder="Search for friend, post or video" />
        </div>
        <div className={styles.create}>
          <Link to="/bookmarks" style={linkStyle}>
            <span className={styles.icon}>
              <BookmarksIcon />
            </span>
          </Link>

          <span className={styles.icon}>
            <SendIcon />
          </span>
          <Link to={`/profile/${user.username}`} style={linkStyle}>
            <div className="profilePhoto">
              <img
                src={
                  user.profilePicture
                    ? publicFolder + encodeURIComponent(user.profilePicture)
                    : publicFolder + encodeURIComponent("profile/NoAvatar.png")
                }
                alt="Profile Pic"
              />
            </div>
          </Link>
          <Link to="/settings" style={linkStyle}>
            <span className={styles.icon}>
              <SettingsIcon />
            </span>
          </Link>
          <div onClick={handleLogout}>
            <span className={styles.icon}>
              <LogoutIcon />
            </span>
          </div>
        </div>
      </div>
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
  );
}

export default Topbar;
