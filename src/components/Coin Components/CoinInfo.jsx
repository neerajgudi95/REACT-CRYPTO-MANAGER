import { Button } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React from "react";
import { db } from "../../config/firebaseConfig";
import { CryptoState } from "../../CryptoContext";
import "./CoinInfo.css";

const CoinInfo = ({ id, image, name, desc, rank, currentPrice, marketCap }) => {
  const { currency, symbol, user, watchList, setAlert } = CryptoState();
  const marketCapital = marketCap[currency.toLowerCase()];
  const currentCoinPrice = currentPrice[currency.toLowerCase()];

  const coinAlreadyInWatchList = watchList?.includes(id);

  const handleAddCoinToWatchList = async () => {
    const coinWatchListRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinWatchListRef, {
        coins: watchList ? [...watchList, id] : [id],
      });
      setAlert({
        open: true,
        message: `${name} coin added to your watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: `Please try again, there was some problem`,
        type: "error",
      });
    }
  };

  const handleRemoveCoinToWatchList = async () => {
    const coinWatchListRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinWatchListRef, {
        coins: watchList.filter((coin) => coin !== id),
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
    <div className="coinInfo d-flex flex-column align-items-center">
      <img src={image} alt={name} height="200" width="200" />
      <h1>{name}</h1>
      <p className="desc">{HTMLReactParser(desc)}.</p>
      <div className="otherInfo">
        <p>
          <span className="title">Rank: </span>
          <span className="value">{rank}</span>
        </p>
        <p>
          <span className="title">Current price: </span>
          <span className="value">{`${symbol} ${new Intl.NumberFormat("en-US", {
            maximumSignificantDigits: 6,
          }).format(currentCoinPrice)}`}</span>
        </p>
        <p>
          <span className="title">Market Cap: </span>
          <span className="value">{millify(marketCapital)}</span>
        </p>
      </div>
      {user && (
        <div className="w-100 mt-2 mb-4">
          <Button
            className="w-100"
            style={{
              color: "black",
              backgroundColor: coinAlreadyInWatchList ? "red" : "gold",
            }}
            onClick={
              coinAlreadyInWatchList
                ? handleRemoveCoinToWatchList
                : handleAddCoinToWatchList
            }
          >
            {coinAlreadyInWatchList
              ? "Remove coin from watchlist"
              : "Add coin from watchlist"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
