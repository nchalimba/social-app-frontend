import React, { useEffect, useState } from "react";
import Leftbar from "../../components/Leftbar/Leftbar";
import styles from "./SinglePost.module.css";
import Post from "../../components/Post/Post";
import { useParams } from "react-router";
import axios from "axios";

function SinglePost() {
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => {
    //fetch post
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/post/${params.id}`);
        if (res.data) setPost(res.data);
      } catch (error) {
        console.error(error);
        setPost(null);
      }
    };
    fetchPost();
  }, [params.id]);
  return (
    <div className={`${styles.singlePost} container`}>
      <Leftbar active="home" />
      <div className={styles.middle}>
        {post && <Post post={post} detailed />}
      </div>
    </div>
  );
}

export default SinglePost;
