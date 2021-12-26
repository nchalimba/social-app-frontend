import React from "react";
import styles from "./Leftbar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { iconStyle, linkStyle } from "../../utils/Styles";
import { useSelector } from "react-redux";
import ExploreIcon from "@mui/icons-material/Explore";
import config from "../../config.json";

function Leftbar({ active, messages }) {
  const user = useSelector((state) => state.user.value);
  const publicFolder = config.image_endpoint;

  return (
    <div className={styles.leftbar}>
      <Link to={`/profile/${user.username}`} style={linkStyle}>
        <div className={styles.profile}>
          <div className="profilePhoto">
            <img
              src={
                user.profilePicture
                  ? publicFolder + encodeURIComponent(user.profilePicture)
                  : publicFolder + encodeURIComponent("profile/NoAvatar.png")
              }
              alt=""
            />
          </div>
          <div className="handle">
            <h4>{`${user.firstName} ${user.lastName}`}</h4>
            <p className="textMuted">@{user.username}</p>
          </div>
        </div>
      </Link>
      <div className={styles.sidebar}>
        <Link to="/" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${styles.firstItem} ${
              active === "home" && styles.active
            }`}
          >
            <span>
              <HomeIcon style={iconStyle} />
            </span>
            <h3>Home</h3>
          </div>
        </Link>
        <Link to="/explore" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${
              active === "explore" && styles.active
            }`}
          >
            <span>
              <ExploreIcon style={iconStyle} />
            </span>
            <h3>Explore</h3>
          </div>
        </Link>
        <Link to="/messenger" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${
              active === "messages" && styles.active
            }`}
          >
            <span>
              {messages > 0 ? (
                <Badge badgeContent={messages} color="error">
                  <SendIcon style={iconStyle} />
                </Badge>
              ) : (
                <SendIcon style={iconStyle} />
              )}
            </span>
            <h3>Messages</h3>
          </div>
        </Link>
        <Link to="/hearted" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${
              active === "hearted" && styles.active
            }`}
          >
            <span>
              <FavoriteIcon style={iconStyle} />
            </span>
            <h3>Hearted</h3>
          </div>
        </Link>
        <Link to="/bookmarks" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${
              active === "bookmarks" && styles.active
            }`}
          >
            <span>
              <BookmarksIcon style={iconStyle} />
            </span>
            <h3>Bookmarks</h3>
          </div>
        </Link>

        <Link to={`/profile/${user.username}`} style={linkStyle}>
          <div
            className={`${styles.menuItem} ${
              active === "profile" && styles.active
            }`}
          >
            <span>
              <PersonIcon style={iconStyle} />
            </span>
            <h3>Profile</h3>
          </div>
        </Link>
        <Link to="/settings" style={linkStyle}>
          <div
            className={`${styles.menuItem} ${styles.lastItem} ${
              active === "settings" && styles.active
            }`}
          >
            <span>
              <SettingsIcon style={iconStyle} />
            </span>
            <h3>Settings</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Leftbar;
