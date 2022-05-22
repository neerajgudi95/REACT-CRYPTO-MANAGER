import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React from "react";
import { CryptoState } from "../CryptoContext";
import "./CoinInfo.css";

const CoinInfo = ({ image, name, desc, rank, currentPrice, marketCap }) => {
  const { currency, symbol } = CryptoState();
  const marketCapital = marketCap[currency.toLowerCase()];
  const currentCoinPrice = currentPrice[currency.toLowerCase()];

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
    </div>
  );
};

export default CoinInfo;
