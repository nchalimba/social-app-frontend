import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Slide } from "@mui/material";

export default function TransitionAlerts(props) {
  const { severity, isOpen, setState } = props;
  const [open, setOpen] = React.useState(isOpen);
  const handleClose = () => {
    setOpen(false);
    setState("");
  };
  function Transition(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <Alert severity={severity}>{props.children}</Alert>
      </Snackbar>
    </>
  );
}
