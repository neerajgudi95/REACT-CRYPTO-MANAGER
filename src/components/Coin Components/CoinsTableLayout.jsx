import { TableCell, TableRow } from "@mui/material";
import millify from "millify";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

const CoinsTableLayout = ({ row, profit }) => {
  const { symbol } = CryptoState();

  const history = useHistory();
  return (
    <TableRow
      onClick={() => history.push(`/coins/${row.id}`)}
      style={{
        cursor: "pointer",
        backgroundColor: "transparent",
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      hover
    >
      <TableCell
        scope="row"
        className="d-flex align-items-center"
        style={{ color: "white" }}
      >
        <img
          src={row?.image}
          alt={row?.name}
          style={{ height: "80px", marginRight: "10px" }}
        />{" "}
        {/* //height="80" /> */}
        <div className="d-flex flex-column ms-3">
          <span style={{ textTransform: "uppercase" }}>{row.symbol}</span>
          <span style={{ color: "darkgrey" }}>{row.name}</span>
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
      <TableCell className="text-center" style={{ color: "white" }}>
        <span>{`${symbol}${millify(row.market_cap)}`}</span>
      </TableCell>
    </TableRow>
  );
};

export default CoinsTableLayout;
