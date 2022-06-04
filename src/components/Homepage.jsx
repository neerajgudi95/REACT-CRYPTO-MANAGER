import React, { lazy, Suspense } from "react";
import { Container, Row } from "react-bootstrap";
const Banner = lazy(() => import("./Banner/Banner"));
const CoinsTable = lazy(() => import("./Coin Components/CoinsTable"));

const Homepage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container fluid className="bg-dark vh-100">
        <Row>
          <Banner />
        </Row>
        <Row>
          <CoinsTable />
        </Row>
      </Container>
    </Suspense>
  );
};

export default Homepage;
