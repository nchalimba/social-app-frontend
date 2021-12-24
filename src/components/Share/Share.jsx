import React, { useEffect, useState } from "react";
import styles from "./Share.module.css";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import { Cancel } from "@material-ui/icons";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import axios from "axios";
import config from "../../config.json";

function Share({ handleRefetch }) {
  const user = useSelector((state) => state.user.value);
  const publicFolder = config.image_endpoint;
  const [emoji, setEmoji] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (emoji) {
      setText((prev) => (emoji ? `${prev}${emoji?.emoji}` : prev));
      setEmoji(null);
    }
  }, [emoji]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text?.trim()) return;
    const post = {
      description: text,
    };
    setText("");

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("folder", "post");
      data.append("file", file);
      post.img = `post/${fileName}`;
      try {
        setFile(null);
        const res = await axios.post("/file", data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      await axios.post("/post", post);
      if (handleRefetch) handleRefetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action="" className={styles.share} onSubmit={submitHandler}>
        <div className={styles.mainSection}>
          <div className="profilePhoto">
            <img
              src={
                user.profilePicture
                  ? publicFolder + encodeURIComponent(user.profilePicture)
                  : publicFolder + encodeURIComponent("person/NoAvatar.png")
              }
              alt=""
            />
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What's on your mind?`}
            id="createPost"
          />
          <span
            className={styles.icon}
            onClick={() => setOpenEmoji(!openEmoji)}
          >
            <InsertEmoticonIcon />
          </span>
          {openEmoji && (
            <div className={styles.emojiPicker}>
              <EmojiPicker
                setChosenEmoji={setEmoji}
                setOpenEmoji={setOpenEmoji}
              />
            </div>
          )}

          <label htmlFor="file" className="shareOption">
            <span className={styles.icon}>
              <ImageIcon />
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <input type="submit" value="Post" className="btn btnPrimary" />
        </div>
        <div className={styles.fileSection}>
          {file && (
            <div className={styles.fileContainer}>
              <img
                src={URL.createObjectURL(file)}
                className={styles.img}
                alt=""
              />
              <Cancel
                className={styles.cancelIcon}
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Share;
