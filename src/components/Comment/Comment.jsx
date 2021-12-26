import React from "react";
import styles from "./Comment.module.css";
import { Link } from "react-router-dom";
import config from "../../config.json";
import { format } from "timeago.js";

function Comment({ comment }) {
  const publicFolder = config.image_endpoint;

  return (
    <div className={styles.comment}>
      <Link to={`/profile/${comment.username}`}>
        <div className="profilePhoto">
          <img
            src={
              comment.profilePicture
                ? publicFolder + encodeURIComponent(comment.profilePicture)
                : publicFolder + encodeURIComponent("profile/NoAvatar.png")
            }
            alt=""
          />
        </div>
      </Link>

      <div className={styles.right}>
        <span>{comment.username}</span> {comment.text}
        <div className="textMuted">{format(comment.createdAt)}</div>
      </div>
    </div>
  );
}

export default Comment;
