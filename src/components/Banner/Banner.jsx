import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Banner.css";
import CoinsCarousel from "./CoinsCarousel";
const Banner = () => {
  return (
    <Container>
      <div className="banner">
        <div className="bannerContent">
          <Row>
            <h1>CRYPTO MANAGER</h1>
            <p>Get all Info regarding various cryptocurrencies</p>
          </Row>
          <Row>
            <CoinsCarousel />
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
