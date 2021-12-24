import React, { useEffect, useState } from "react";
import EditProfile from "../../components/EditProfile/EditProfile";
import Feed from "../../components/Feed/Feed";
import Leftbar from "../../components/Leftbar/Leftbar";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Share from "../../components/Share/Share";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState("");
  const currentUser = useSelector((state) => state.user.value);

  const params = useParams();

  const handleRefetch = () => {
    setRefetch(Date.now());
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?username=${params.username}`);
        setUser(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.username]);

  const isCurrentUser = params.username === currentUser.username;

  return (
    <div className={`${styles.profile} container`}>
      <Leftbar active="profile" />
      <div className={styles.middle}>
        {loading ? (
          <div className="loading">
            <CircularProgress color="inherit" size="3rem" />
          </div>
        ) : (
          <>
            <ProfileHeader isCurrentUser={isCurrentUser} user={user} />
            {isCurrentUser && (
              <>
                <EditProfile user={user} />
                <Share handleRefetch={handleRefetch} />
              </>
            )}

            <Feed username={params.username} refetch={refetch} />
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
