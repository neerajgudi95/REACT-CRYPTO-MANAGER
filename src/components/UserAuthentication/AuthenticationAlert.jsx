import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CryptoState } from "../../CryptoContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AuthenticationAlert() {
  const { alert, setAlert } = CryptoState();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alert.type} sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
