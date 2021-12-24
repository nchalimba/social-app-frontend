import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import { linkStyle } from "../../utils/Styles";

function NotFound() {
  return (
    <div className={`${styles.notFound} container`}>
      <h1>404 Page Not Found</h1>
      <div className="btn btnPrimary">
        <Link style={linkStyle} to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
