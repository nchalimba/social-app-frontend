import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";

import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ShareDialog.module.css";
import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { Cancel } from "@material-ui/icons";
import axios from "axios";

function ShareDialog({ open, setOpen, setSuccess }) {
  const theme = useSelector((state) => state.theme.value);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [emoji, setEmoji] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (emoji) {
      setText((prev) => (emoji ? `${prev}${emoji?.emoji}` : prev));
      setEmoji(null);
    }
  }, [emoji]);

  useEffect(() => {
    console.log(file);
  }, [file]);

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
        const res = await axios.post("/api/file", data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      await axios.post("/api/post", post);
      window.location.reload();
      setSuccess("Post created");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      open={open}
      sx={{ color: "inherit" }}
    >
      <div
        className={`${theme.background === "dark-theme" && "modal-dark"} ${
          styles.shareDialog
        }`}
      >
        <div className={styles.header}>
          <span className={styles.icon} onClick={handleClose}>
            <CloseIcon />
          </span>

          <h3>Create a post</h3>
        </div>

        <form action="" onSubmit={submitHandler} className={styles.form}>
          <div>
            <textarea
              rows="6"
              className={`textAreaInput ${styles.input} ${
                theme.background === "dark-theme"
                  ? "modalInputDark"
                  : "modalInputLight"
              }`}
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.icons}>
            <span
              className={styles.icon}
              onClick={() => setOpenEmoji(!openEmoji)}
            >
              <InsertEmoticonIcon fontSize="large" />
            </span>
            {openEmoji && (
              <div className={styles.emojiPicker}>
                <EmojiPicker
                  setChosenEmoji={setEmoji}
                  setOpenEmoji={setOpenEmoji}
                />
              </div>
            )}

            <label htmlFor="sharePicture" className="">
              <span className={styles.icon}>
                <ImageIcon fontSize="large" />
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="sharePicture"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
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
          <input
            type="submit"
            value="POST"
            className={`btn-small btn ${styles.button} `}
          />
        </form>
      </div>
    </Dialog>
  );
}

export default ShareDialog;
