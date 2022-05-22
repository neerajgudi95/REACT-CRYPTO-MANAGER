import {
  TableContainer,
  LinearProgress,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
  Pagination,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { CoinList } from "../../config/apiEndpoints";
import { CryptoState } from "../../CryptoContext";
import { useHistory } from "react-router-dom";
import { millify } from "millify";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const history = useHistory();

  const fetchCryptoCoins = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios
      .get(CoinList(currency))
      .catch((err) => console.log(err.message));
    setCoins(data);
    setIsLoading(false);
  }, [currency]);

  const searchCrypto = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  useEffect(() => {
    fetchCryptoCoins();
  }, [fetchCryptoCoins]);

  return (
    <Container
      fluid
      className="bg-dark text-center mt-4 d-flex align-items-center justify-content-center flex-column"
      style={{ color: "white" }}
    >
      <h4 style={{ fontSize: "2rem" }}>Cryptocurrency Prices by Makret Cap</h4>
      <Form.Control
        className="w-1 bg-dark text-light mt-3"
        type="text"
        placeholder="enter name or symbol of the crypto you want"
        style={{
          border: "1px solid rgba(255,255,255,0.4)",
          maxWidth: "800px",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
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
                {["S.No.", "Coin", "Price", "24h Change", "Market Cap"].map(
                  (head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                      }}
                      key={head}
                      align="center"
                      // {head === "Coin" ? "left" : "center"}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableHead>
              <TableBody>
                {searchCrypto()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row, idx) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        key={row.name}
                        style={{
                          cursor: "pointer",
                        }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell
                          className="text-center"
                          style={{ color: "white" }}
                        >
                          <span>{idx + 1}</span>
                        </TableCell>
                        <TableCell
                          scope="row"
                          className="d-flex align-items-center justify-content-center"
                          style={{ color: "white" }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            style={{ height: "80px", marginRight: "10px" }}
                          />{" "}
                          {/* //height="80" /> */}
                          <div className="d-flex flex-column ms-3">
                            <span style={{ textTransform: "uppercase" }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <h4
                            style={{ color: "gold", fontSize: "22px" }}
                          >{`${symbol} ${new Intl.NumberFormat("en-US", {
                            maximumSignificantDigits: 3,
                          }).format(row?.current_price.toFixed(2))}`}</h4>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            style={{
                              fontWeight: "bold",
                              color: profit ? "green" : "red",
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell
                          className="text-center"
                          style={{ color: "white" }}
                        >
                          <span>{`${symbol}${millify(row.market_cap)}`}</span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Pagination
        count={+(searchCrypto()?.length / 10).toFixed(0)}
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
