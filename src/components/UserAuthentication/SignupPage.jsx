import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignupPage({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSumbit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      setAlert({
        open: true,
        message: "Enter all the fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign up successful, Welcome to crypto manager ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: false,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 2, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Divider />
      <Button
        style={{ color: "black", backgroundColor: "gold" }}
        onClick={handleSumbit}
      >
        SIGNUP
      </Button>
    </Box>
  );
}

export default SignupPage;
