import React, { useEffect, useState } from "react";
import styles from "./ProfileHeader.module.css";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { Remove } from "@material-ui/icons";
import axios from "axios";
import config from "../../config.json";

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "gray" },
  },
}));

function ProfileHeader({ isCurrentUser, user }) {
  const classes = useStyles();
  const publicFolder = config.image_endpoint;
  const [followed, setFollowed] = useState(false);
  const currentUser = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const fetchedCurrentUser = await axios.get("/api/user/current");
        setFollowed(fetchedCurrentUser.data.following.includes(user?._id));
      } catch (error) {
        console.error(error);
      }
    };
    !isCurrentUser && fetchCurrentUser();
  }, [currentUser, user?._id]);

  const handleFollow = async () => {
    try {
      if (!followed) {
        await axios.put("/user/" + user._id + "/api/follow");
      } else {
        await axios.put("/user/" + user._id + "/api/unfollow");
      }
      setFollowed(!followed);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.profileHeader}>
      <div>
        <div className={styles.left}>
          <div className={styles.profilePhoto}>
            <img
              src={
                user.profilePicture
                  ? publicFolder + encodeURIComponent(user.profilePicture)
                  : publicFolder + encodeURIComponent("person/NoAvatar.png")
              }
              alt=""
            />
          </div>
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.rightHeader}>
          <h3 className={`${styles.username} textMuted`}>@{user.username}</h3>
          {!isCurrentUser && (
            <>
              <div className={styles.buttons}>
                <div className={`btn btnPrimary ${styles.button}`}>Message</div>
                <div
                  className={`btn btnPrimary ${styles.button} ${styles.followButton}`}
                  onClick={handleFollow}
                >
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.personalInfo}>
          <p>{user.amountPosts || 0} posts</p>
          <p>{user.followers?.length} followers</p>
        </div>
        <div className={styles.description}>
          <p>{user.description}</p>
        </div>
        <div className={styles.personalInfo}>
          <h4>City</h4>
          <p>{user.city || "-"}</p>
          <h4>From</h4>
          <p>{user.from || "-"}</p>
          <h4>Relationship</h4>
          <p>
            {user.relationship === 1
              ? "Married"
              : user.relationship === 2
              ? "Single"
              : user.relationship === 3
              ? "In a relationship"
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
