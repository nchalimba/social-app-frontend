import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styles from "./Loader.module.css";

function Loader({ loading, size }) {
  return (
    <div className={styles.loader}>
      {loading && <CircularProgress color="inherit" size={size || "2rem"} />}
    </div>
  );
}

export default Loader;
