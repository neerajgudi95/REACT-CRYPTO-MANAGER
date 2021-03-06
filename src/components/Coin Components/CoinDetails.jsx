import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../config/apiEndpoints";
import { Col, Container, Row } from "react-bootstrap";
import { LinearProgress } from "@mui/material";
const CoinInfo = React.lazy(() => import("./CoinInfo"));
const CoinChart = React.lazy(() => import("./CoinChart"));

const CoinDetails = () => {
  const [coinData, setCoinData] = useState();
  const { coinId } = useParams();

  const getCoinData = useCallback(async () => {
    const { data } = await axios.get(SingleCoin(coinId));
    setCoinData(data);
  }, [coinId]);

  useEffect(() => {
    getCoinData();
  }, [getCoinData]);

  if (!coinData)
    return (
      <LinearProgress
        color="inherit"
        style={{
          maxWidth: "90%",
          borderRadius: "50px",
          backgroundColor: "gold",
        }}
        className="mt-3"
      />
    );

  return (
    <Suspense
      fallback={
        <div className="bg-dark" style={{ minHeight: "100vh" }}>
          Loading...
        </div>
      }
    >
      <Container fluid className="p-4" style={{ minHeight: "90.5vh" }}>
        <Row>
          <Col className="col-lg-3 col-md-12 info">
            <CoinInfo
              id={coinData?.id}
              image={coinData?.image.large}
              name={coinData?.name}
              desc={coinData?.description.en.split(". ")[0]}
              rank={coinData?.market_cap_rank}
              currentPrice={coinData?.market_data.current_price}
              marketCap={coinData?.market_data.market_cap}
            />
          </Col>
          <Col className="col-lg-9 col-md-12">
            <CoinChart />
          </Col>
        </Row>
      </Container>
    </Suspense>
  );
};

export default CoinDetails;
