import React, { useState } from "react";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import Share from "../../components/Share/Share";
import styles from "./Home.module.css";

function Home({ type }) {
  const [refetch, setRefetch] = useState("");
  const handleRefetch = () => {
    setRefetch(Date.now());
  };
  return (
    <div className={`${styles.home} container`}>
      <Leftbar active={type} />
      <div className={styles.middle}>
        {type === "home" && <Share handleRefetch={handleRefetch} />}
        <Feed type={type} refetch={refetch} />
      </div>
    </div>
  );
}

export default Home;
