import React, { useState } from "react";
import styles from "./Topbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/Styles";
import axios from "axios";
import { logout } from "../../features/user";
import config from "../../config.json";
import Alert from "../../components/misc/Alert";
import ShareDialog from "../ShareDialog/ShareDialog";

function Topbar() {
  const theme = useSelector((state) => state.theme.value);
  const user = useSelector((state) => state.user.value);
  const publicFolder = config.image_endpoint;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openShare, setOpenShare] = useState(false);

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

  const handlePost = () => {
    //set modal open
    //show post
    //onClick: refresh page
    //then close
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

          <div onClick={() => setOpenShare(true)} className={styles.postIcon}>
            <span className={`${styles.icon}`}>
              <AddBoxOutlinedIcon />
            </span>
          </div>

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

          <span className={styles.icon}>
            <Link to="/settings" style={linkStyle}>
              <SettingsIcon />
            </Link>
          </span>

          <div onClick={handleLogout}>
            <span className={`${styles.logoutIcon} ${styles.icon}`}>
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
      <ShareDialog
        open={openShare}
        setOpen={setOpenShare}
        setSuccess={setSuccess}
      />
    </div>
  );
}

export default Topbar;
