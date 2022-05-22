import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../config/apiEndpoints";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../config/data";

const CoinChart = () => {
  const { currency } = CryptoState();
  const { coinId } = useParams();
  const [coinChartData, setChartCoinData] = useState([]);
  const [days, setDays] = useState("24h");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
  const fetchHistoryData = useCallback(async () => {
    const { data } = await axios.get(
      HistoricalChart(coinId, days, currency.toLowerCase())
    );
    setChartCoinData(data.prices);
  }, [coinId, days, currency]);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  return (
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      {coinChartData.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        </div>
      ) : (
        <div>
          <Line
            className="flex-lg-grow-1"
            data={{
              labels: coinChartData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: coinChartData.map((coin) => coin[1]),
                  label: `Price (Past ${
                    days === 1 ? "24 hours" : days
                  }} Days) in ${currency}`,
                  borderColor: "#EEBC1d",
                },
              ],
            }}
            options={{ elements: { point: { radius: 1 } } }}
          />
        </div>
      )}
      <div className="d-flex justify-content-between mt-2">
        {chartDays.map((day, idx) => {
          const btnStyle = {
            borderColor: "gold",
            color: `${day.value === days ? "black" : "gold"}`,
            flex: 0.25,
            margin: "0 10px",
            fontWeight: "bold",
            backgroundColor: `${day.value === days ? "gold" : "transparent"}`,
          };
          return (
            <Button
              variant="outlined"
              style={btnStyle}
              onClick={() => setDays(day.value)}
              key={idx}
            >
              {day.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CoinChart;
