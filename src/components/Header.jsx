import React from "react";
import { Container, Form, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthenticationModal from "../components/UserAuthentication/AuthenticationModal";
import UserInfo from "./UserAuthentication/UserInfo";
const Header = () => {
  const { currency, setCurrency, user } = CryptoState();
  return (
    <Navbar bg="dark" expand="lg">
      <Container className="d-flex p-2 col-example justify-content-between align-items-center">
        <Navbar.Brand
          className="text-light"
          style={{ width: "100px", fontWeight: "800" }}
        >
          <Link to="/" style={{ color: "gold", textDecoration: "none" }}>
            CRYPTO MANAGER
          </Link>
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Form.Select
            aria-label="select currency"
            onChange={(e) => setCurrency(e.target.value)}
            defaultValue={currency}
            className="bg-secondary text-light mx-2"
            style={{
              width: "100px",
              color: "white",
              cursor: "pointer",
              borderColor: "gold",
            }}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </Form.Select>
          {user ? <UserInfo /> : <AuthenticationModal />}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
