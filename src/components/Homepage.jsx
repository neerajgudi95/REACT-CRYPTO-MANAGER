import React from "react";
import { Container, Row } from "react-bootstrap";
import Banner from "./Banner/Banner";
import CoinsTable from "./Banner/CoinsTable";

const Homepage = () => {
  return (
    <Container fluid className="bg-dark vh-100">
      <Row>
        <Banner />
      </Row>
      <Row>
        <CoinsTable />
      </Row>
    </Container>
  );
};

export default Homepage;
