import React, { useState } from "react";

function Menu({ anchor }) {
  const [anchorElement, setAnchorElement] = useState(anchor);
  const open = Boolean(anchorElement);

  return <div></div>;
}

export default Menu;
