import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/apiEndpoints";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { Badge, Spinner } from "react-bootstrap";

const CoinsCarousel = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCrypto = useCallback(async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  }, [currency]);

  useEffect(() => {
    fetchTrendingCrypto();
  }, [fetchTrendingCrypto]);

  const carouselItemStyle = {
    cursor: "pointer",
    textTransform: "uppercase",
    color: "gold",
    textDecoration: "none",
  };

  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        className="d-flex align-items-center flex-column"
        style={carouselItemStyle}
        to={`/coins/${coin.id}`}
        key={coin.ath}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span style={{ fontWeight: "bold" }}>{coin?.symbol} </span>
        <Badge bg={`${profit ? "success" : "danger"}`} className="ml-2">
          {profit && "+"}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Badge>

        <span style={{ fontSize: "22px", fontWeight: "bold" }}>
          {`${symbol} ${new Intl.NumberFormat("en-US", {
            maximumSignificantDigits: 3,
          }).format(coin?.current_price.toFixed(2))}`}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <div className="coins-carousel">
      {!trendingCoins ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={5000}
          autoPlay
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          items={items}
        />
      )}
    </div>
  );
};

// https://youtu.be/QA6oTpMZp84?t=2827
export default CoinsCarousel;
