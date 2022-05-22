import React, { createContext, useContext, useState, useEffect } from "react";

const cryptoContext = createContext();

const CryptoContext = ({ children }) => {
  const [symbol, setSymbol] = useState("₹");
  const [currency, setCurrency] = useState("INR");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <cryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </cryptoContext.Provider>
  );
};

export const CryptoState = () => {
  return useContext(cryptoContext);
};
export default CryptoContext;
