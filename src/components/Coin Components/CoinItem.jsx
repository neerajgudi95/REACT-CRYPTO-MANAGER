import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, IconButton } from "@mui/material";
import { db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { CryptoState } from "../../CryptoContext";

const CoinItem = ({ logo, name }) => {
  const { user, setAlert, watchList } = CryptoState();

  const handleRemoveCoinToWatchList = async () => {
    const coinWatchListRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinWatchListRef, {
        coins: watchList.filter((coin) => coin !== name),
      });
      setAlert({
        open: true,
        message: `${name} coin removed to your watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: `Some problem occured, please try again later`,
        type: "error",
      });
    }
  };

  return (
    <div className="coinItem d-flex align-items-center justify-content-between bg-warning">
      <div className="coinName d-flex align-items-center h-100">
        <Avatar src={logo} alt="name" sx={{ width: 40, height: 40 }} />
        <h6>{name}</h6>
      </div>
      <IconButton
        // style={{ backgorundColor: "transparent", border: "none" }}
        onClick={handleRemoveCoinToWatchList}
      >
        <DeleteIcon sx={{ bgColor: "transparent" }} />
      </IconButton>
    </div>
  );
};

export default CoinItem;
