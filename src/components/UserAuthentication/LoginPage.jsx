import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  // GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleAuthenticationProvider,
} from "../../config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";

export default function LoginPage({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert, setUser } = CryptoState();

  const handleSumbit = async () => {
    if (password.length === 0 || email.length === 0) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.email) {
        throw "Invalid email/password";
      } else {
        setAlert({
          open: true,
          message: `Login successful, Welcome back to crypto manager ${result.user.email}`,
          type: "success",
        });
        handleClose();
      }
    } catch (error) {
      setAlert({
        open: true,
        message: `Login failed due to ${error.message}`,
        type: "error",
      });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      signInWithPopup(auth, googleAuthenticationProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setUser(user);
      });
    } catch (error) {
      // Handle Errors here.
      console.log(error);
      // ...
    }
  };

  return (
    <Box
      // component="form"
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
      <Button
        style={{ color: "black", backgroundColor: "gold" }}
        onClick={(e) => {
          e.preventDefault();
          handleSumbit();
        }}
      >
        LOGIN
      </Button>
      <div className="d-flex justify-content-center ">OR</div>
      <div className="text-light d-flex justify-content-center ">
        <button
          className="bg-primary text-light d-flex align-items-center w-100"
          style={{ border: "none" }}
          onClick={handleGoogleAuth}
        >
          <span className="p-2 bg-danger text-light">
            <GoogleIcon />
          </span>
          <span className="p-2 text-center w-100">LOGIN WITH GOOGLE</span>
        </button>
      </div>
    </Box>
  );
}
