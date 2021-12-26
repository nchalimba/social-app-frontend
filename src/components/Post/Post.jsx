import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "timeago.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import config from "../../config.json";
import CommentSection from "../CommentSection/CommentSection";
import { useNavigate } from "react-router-dom";
import SharePost from "../SharePost/SharePost";
import Alert from "../../components/misc/Alert";

function Post({ post, deletePost, own, detailed }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [success, setSuccess] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState({});
  const [anchorElement, setAnchorElement] = useState(null);
  const [searchParams] = useSearchParams();
  const [openComments, setOpenComments] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const navigate = useNavigate();
  const openMore = Boolean(anchorElement);

  const publicFolder = config.image_endpoint;
  const currentUser = useSelector((state) => state.user.value);

  useEffect(() => {
    setOpenComments(JSON.parse(searchParams.get("openComments")));
  }, [searchParams]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setLiked(post.likes.includes(currentUser.id));
  }, [currentUser.id, post.likes]);

  useEffect(() => {
    setBookmarked(post.bookmarks.includes(currentUser.id));
  }, [currentUser.id, post.bookmarks]);

  const likeHandler = () => {
    try {
      axios.put("/api/post/" + post._id + "/like");
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
    } catch (error) {}
  };

  const bookmarkHandler = () => {
    try {
      axios.put("/api/post/" + post._id + "/bookmark");
      setBookmarked(!bookmarked);
    } catch (error) {}
  };

  const handleClickMore = (event) => {
    own && setAnchorElement(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorElement(null);
  };

  const handleDeletePost = () => {
    handleCloseMore();
    deletePost(post._id);
  };

  const handleViewComments = () => {
    if (detailed) {
      setOpenComments(!openComments);
    } else {
      //TODO: navigate to single post section and open comments
      navigate({ pathname: `/post/${post._id}`, search: `?openComments=true` });
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.head}>
        <div className={styles.user}>
          <Link to={`/profile/${user.username}`}>
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
          </Link>

          <div>
            <h3>{user.username}</h3>
            <small>{`${post.location ? `${post.location}, ` : ""}${format(
              post.createdAt,
              "en_GB"
            )}`}</small>
          </div>
        </div>
        <span
          className={styles.icon}
          onClick={handleClickMore}
          id="more-button"
        >
          <MoreHorizIcon />
        </span>
        {own && (
          <Menu
            anchorEl={anchorElement}
            open={openMore}
            onClose={handleCloseMore}
            MenuListProps={{
              "aria-labelledby": "more-button",
            }}
          >
            <MenuItem
              dense="true"
              onClick={handleDeletePost}
              sx={{ margin: 0 }}
            >
              Delete
            </MenuItem>
          </Menu>
        )}
      </div>
      {post.img && (
        <div className={styles.photo}>
          <img
            src={publicFolder + encodeURIComponent(post.img)}
            alt="post"
            className="postImg"
          />
        </div>
      )}
      <div className={styles.actionButtons}>
        <div>
          <span className={styles.icon} onClick={likeHandler}>
            {liked ? (
              <FavoriteIcon style={{ color: "var(--color-danger)" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </span>
          <span className={styles.icon} onClick={handleViewComments}>
            <ChatBubbleOutlineIcon />
          </span>
          <span className={styles.icon} onClick={() => setOpenShare(true)}>
            <ShareIcon />
          </span>
        </div>
        <SharePost
          open={openShare}
          setOpen={setOpenShare}
          postId={post._id}
          setSuccess={setSuccess}
        />
        <div className={styles.icon} onClick={bookmarkHandler}>
          <span>
            {bookmarked ? (
              <BookmarkIcon style={{ color: "var(--color-gold)" }} />
            ) : (
              <BookmarkBorderIcon />
            )}
          </span>
        </div>
      </div>
      <p className={styles.likedBy}>
        Liked <b>{likes}</b> {likes === 1 ? "time" : "times"}
      </p>
      <div className={styles.caption}>
        <p>
          <b>{`${user.firstName} ${user.lastName} `}</b>
          {post.description}
          {post.hashTags &&
            post.hashTags.map((hashTag, index) => (
              <span key={index} className={styles.hashTag}>
                {" "}
                #{hashTag}
              </span>
            ))}
        </p>
      </div>

      <div>
        {post.comments?.length > 0 && (
          <div
            className={`${styles.comments} textMuted`}
            onClick={handleViewComments}
          >
            View all {post.comments.length} comments
          </div>
        )}
        {detailed && <CommentSection open={openComments} postId={post._id} />}
      </div>
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

export default Post;
