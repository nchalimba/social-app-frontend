import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import Comment from "../Comment/Comment";
import Divider from "@mui/material/Divider";
import styles from "./CommentSection.module.css";
import axios from "axios";
import Alert from "../../components/misc/Alert";

function CommentSection({ open, postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [refetch, setRefetch] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/`, { params: { postId } });
        setComments(
          res.data.sort((comment1, comment2) => {
            return new Date(comment2.createdAt) - new Date(comment1.createdAt);
          })
        );
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [postId, refetch]);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const payload = { postId, text };
      await axios.post("/api/comment/", payload);
      setSuccess("Comment created");
      setRefetch(Date.now());
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setText("");
    }
  };
  return (
    <div>
      <Collapse in={open}>
        <Divider>Comments</Divider>
        <form className={styles.create} onSubmit={handleCreateComment}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Create a comment"
          />
          <input
            type="submit"
            value="Post"
            className="btn-small btn btnPrimary"
          />
        </form>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </Collapse>
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

export default CommentSection;
