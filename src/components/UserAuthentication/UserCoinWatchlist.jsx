import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CoinItem from "../Coin Components/CoinItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserCoinWatchlist({ userCoinList }) {
  return (
    <Box sx={{ width: "100%" }}>
      {userCoinList.map((coinItem) => (
        <Item className="bg-warning text-white" key={coinItem}>
          <CoinItem name={coinItem} />
        </Item>
      ))}
    </Box>
  );
}
