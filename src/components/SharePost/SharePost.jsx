import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemAvatar } from "@mui/material";
import { useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function SharePost({ open, setOpen, postId, setSuccess }) {
  const [link, setLink] = useState("");
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    setLink(`${window.location.host}/post/${postId}`);
  }, [postId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyClick = () => {
    setOpen(false);
    navigator.clipboard.writeText(link);
    setSuccess("Link copied to clipboard");
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ color: "inherit" }}>
      <div className={theme.background === "dark-theme" && "modal-dark"}>
        <DialogTitle sx={{ background: "inherit" }}>
          Share this post
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem button onClick={handleCopyClick}>
            <ListItemAvatar>
              <ContentCopyIcon />
            </ListItemAvatar>
            <ListItemText primary="Copy link" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
}

export default SharePost;
