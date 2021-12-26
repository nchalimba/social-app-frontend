import React, { useEffect, useState } from "react";
import styles from "./ProfileHeader.module.css";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import { Remove } from "@material-ui/icons";
import axios from "axios";
import config from "../../config.json";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import Alert from "../../components/misc/Alert";
import { update } from "../../features/user";

function ProfileHeader({ isCurrentUser, user }) {
  const publicFolder = config.image_endpoint;
  const [followed, setFollowed] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.user.value);
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch();

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
  }, [currentUser, user?._id, isCurrentUser]);

  const handleFollow = async () => {
    try {
      if (!followed) {
        await axios.put("/api/user/" + user._id + "/follow");
      } else {
        await axios.put("/api/user/" + user._id + "/unfollow");
      }
      setFollowed(!followed);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeProfilePicture = async () => {
    try {
      //upload file
      const data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      data.append("folder", "profile");
      await axios.post("/api/file", data);
      //change user data
      const userPayload = { profilePicture: `profile/${fileName}` };
      await axios.put(`/api/user/${currentUser.id}`, userPayload);

      //change user state
      dispatch(update(userPayload));
      setProfilePicture(null);
      //alert
      setSuccess("Profile image updated");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div className={styles.profileHeader}>
      <div>
        <div className={styles.left}>
          <div className={styles.profilePhoto}>
            {isCurrentUser && !profilePicture ? (
              <img
                src={
                  currentUser.profilePicture
                    ? publicFolder +
                      encodeURIComponent(currentUser.profilePicture)
                    : publicFolder + encodeURIComponent("profile/NoAvatar.png")
                }
                alt=""
              />
            ) : isCurrentUser && profilePicture ? (
              <img src={URL.createObjectURL(profilePicture)} alt="" />
            ) : (
              <img
                src={
                  user.profilePicture
                    ? publicFolder + encodeURIComponent(user.profilePicture)
                    : publicFolder + encodeURIComponent("profile/NoAvatar.png")
                }
                alt=""
              />
            )}
          </div>
          {isCurrentUser && (
            <form action="" className={styles.editPictureForm}>
              <label htmlFor="file">
                <span className={styles.icon}>
                  <EditIcon />
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </label>
            </form>
          )}
          {profilePicture && (
            <div className={styles.pictureConfirm}>
              <CheckIcon
                color="success"
                className={styles.icon}
                onClick={handleChangeProfilePicture}
              />
              <CloseIcon
                color="error"
                className={styles.icon}
                onClick={() => setProfilePicture(null)}
              />
            </div>
          )}
          {isCurrentUser ? (
            <h3>{`${currentUser.firstName} ${currentUser.lastName}`}</h3>
          ) : (
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
          )}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.rightHeader}>
          {isCurrentUser ? (
            <h3 className={`${styles.username} textMuted`}>
              @{currentUser.username}
            </h3>
          ) : (
            <h3 className={`${styles.username} textMuted`}>@{user.username}</h3>
          )}
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
          {isCurrentUser ? (
            <p>{currentUser.description}</p>
          ) : (
            <p>{user.description}</p>
          )}
        </div>
        <div className={styles.personalInfo}>
          <h4>City</h4>
          {isCurrentUser ? (
            <p>{currentUser.city || "-"}</p>
          ) : (
            <p>{user.city || "-"}</p>
          )}
          <h4>Country</h4>
          {isCurrentUser ? (
            <p>{currentUser.country || "-"}</p>
          ) : (
            <p>{user.country || "-"}</p>
          )}
          <h4>Relationship</h4>
          {isCurrentUser ? (
            <p>
              {currentUser.relationship === 1
                ? "Married"
                : currentUser.relationship === 2
                ? "Single"
                : currentUser.relationship === 3
                ? "In a relationship"
                : "Not specified"}
            </p>
          ) : (
            <p>
              {user.relationship === 1
                ? "Married"
                : user.relationship === 2
                ? "Single"
                : user.relationship === 3
                ? "In a relationship"
                : "Not specified"}
            </p>
          )}
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
      {success && (
        <Alert
          isOpen={success ? true : false}
          severity="success"
          setState={setSuccess}
        >
          {success}
        </Alert>
      )}
    </div>
  );
}

export default ProfileHeader;
