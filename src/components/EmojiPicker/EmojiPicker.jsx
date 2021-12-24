import React, { useState } from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

function EmojiPicker({ setChosenEmoji, setOpenEmoji }) {
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setOpenEmoji(false);
  };
  return (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus={true}
        skinTone={SKIN_TONE_MEDIUM_DARK}
        groupNames={{ smileys_people: "PEOPLE" }}
        native
      />
    </div>
  );
}

export default EmojiPicker;
