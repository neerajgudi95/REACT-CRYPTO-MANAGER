import {
  TableContainer,
  LinearProgress,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Pagination,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState, useReducer } from "react";
import { Container, Form } from "react-bootstrap";
import { CoinList } from "../../config/apiEndpoints";
import { CryptoState } from "../../CryptoContext";
import CoinsTableLayout from "./CoinsTableLayout";

const sortReducer = (state = { sortedList: [] }, action) => {
  state.sortedList = action.payload;
  switch (action.type) {
    case "0":
      return state.sortedList;
    case "1":
      console.log("name sorted");
      return [...state.sortedList.sort((a, b) => (a.name > b.name ? 1 : -1))];
    case "2":
      return [
        ...state.sortedList.sort((a, b) => b.current_price - a.current_price),
      ];
    case "3":
      return [
        ...state.sortedList.sort((a, b) => a.current_price - b.current_price),
      ];
    case "4":
      return [...state.sortedList.sort((a, b) => b.market_cap - a.market_cap)];
    case "5":
      return [...state.sortedList.sort((a, b) => a.market_cap - b.market_cap)];
    default:
      return [...action.payload];
  }
};

const CoinsTable = () => {
  // const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency } = CryptoState();
  const [state, dispatcher] = useReducer(sortReducer);

  const fetchCryptoCoins = useCallback(async () => {
    setIsLoading(true);
    const data = await axios
      .get(CoinList(currency))
      .catch((err) => console.log(err.message));
    dispatcher({ type: 0, payload: data.data });
    setIsLoading(false);
  }, [currency]);

  // market_cap current_price
  useEffect(() => {
    fetchCryptoCoins();
  }, [fetchCryptoCoins]);

  const searchCrypto = () => {
    return state?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <Container
      fluid
      className="bg-dark text-center mt-4 d-flex align-items-center justify-content-center flex-column"
      style={{ color: "white" }}
    >
      <h4 style={{ fontSize: "2rem" }}>Cryptocurrency Prices by Makret Cap</h4>
      <div
        className="d-flex p-2 col-example justify-content-between align-items-center"
        style={{
          width: "80%",
        }}
      >
        <Form.Control
          className="bg-dark text-light"
          type="text"
          placeholder="enter name or symbol of the crypto you want"
          style={{
            border: "1px solid rgba(255,255,255,0.4)",
            maxWidth: "800px",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select
          aria-label="select sort value"
          onChange={(e) => dispatcher({ type: e.target.value, payload: state })}
          className="bg-dark text-light"
          placeholder="sort by"
          style={{
            width: "100px",
            color: "white",
            cursor: "pointer",
            flex: "0.7",
          }}
        >
          <option value="0">Sort by</option>
          <option value="1">Name</option>
          <option value="2">Price - High to Low</option>
          <option value="3">Price - Low to High</option>
          <option value="4">Market Cap - High to Low</option>
          <option value="5">Market Cap - Low to High</option>
        </Form.Select>
      </div>
      <Container>
        {isLoading ? (
          <LinearProgress
            color="inherit"
            style={{
              maxWidth: "90%",
              borderRadius: "50px",
              backgroundColor: "gold",
            }}
            className="mt-3"
          />
        ) : (
          <TableContainer>
            <Table
              className="mt-3"
              // sx={}
            >
              <TableHead
                className="bg-warning"
                style={{ borderRadius: "10px" }}
              >
                {["Crytocurrency", "Price", "24h Change", "Market Cap"].map(
                  (head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                      }}
                      key={head}
                      align={head === "Crytocurrency" ? "left" : "center"}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableHead>
              <TableBody>
                {searchCrypto()
                  ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <CoinsTableLayout
                        key={row.name}
                        row={row}
                        profit={profit}
                      />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      {/* {console.log(typeof parseInt((state?.length / 10).toFixed(0)))} */}
      <Pagination
        count={parseInt((state?.length / 10).toFixed(0))}
        className="m-2 d-flex justify-content-center"
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
        color="primary"
      />
    </Container>
  );
};

export default CoinsTable;
