import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import styles from "./Feed.module.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "../../components/misc/Alert";
import { useSelector } from "react-redux";

function Feed({ username, type, refetch }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localRefetch, setLocalRefetch] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user.value);

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/post/${id}`);
      setSuccess("Post has been deleted");
      setLocalRefetch(Date.now());
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res;
        if (username) {
          res = await axios.get(`/api/post/profile/${username}`);
        } else if (type === "hearted") {
          res = await axios.get("/api/post/liked");
        } else if (type === "bookmarks") {
          res = await axios.get("/api/post/bookmarked");
        } else if (type === "explore") {
          res = await axios.get("/api/post/explore");
        } else {
          res = await axios.get("/api/post/timeline");
        }
        setPosts(
          res.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [username, type, refetch, localRefetch]);

  return (
    <div className={styles.feed}>
      {loading ? (
        <div className="loading">
          <CircularProgress color="inherit" size="3rem" />
        </div>
      ) : (
        posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            own={user.id === post.userId}
            deletePost={deletePost}
          />
        ))
      )}
    </div>
  );
}

export default Feed;
