import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { CoinList } from "./config/apiEndpoints";
import { auth, db } from "./config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const cryptoContext = createContext();

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

const CryptoContext = ({ children }) => {
  const [symbol, setSymbol] = useState("₹");
  const [currency, setCurrency] = useState("INR");
  const [user, setUser] = useState(null);
  const [state, dispatcher] = useReducer(sortReducer);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [watchList, setWatchList] = useState([]);
  const fetchCryptoCoins = useCallback(async () => {
    const data = await axios
      .get(CoinList(currency))
      .catch((err) => console.log(err.message));
    dispatcher({ type: 0, payload: data.data });
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [user]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      const coinListRef = doc(db, "watchlist", user?.uid);
      unsubscribe = onSnapshot(coinListRef, (coinList) => {
        if (coinList.exists()) {
          setWatchList(coinList.data().coins);
        }
      });
    }
    return () => {
      unsubscribe();
      console.log(`firebase unsubscribed`);
    };
  }, [user]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <cryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        state,
        fetchCryptoCoins,
        dispatcher,
        alert,
        setAlert,
        user,
        setUser,
        watchList,
      }}
    >
      {children}
    </cryptoContext.Provider>
  );
};

export const CryptoState = () => {
  return useContext(cryptoContext);
};
export default CryptoContext;
