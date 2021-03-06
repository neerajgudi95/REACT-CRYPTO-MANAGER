import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
// import { Header, Homepage, CoinDetails } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgress } from "@mui/material";
import AuthenticationAlert from "./components/UserAuthentication/AuthenticationAlert";

const Header = React.lazy(() => import("./components/Header"));
const Homepage = React.lazy(() => import("./components/Homepage"));
const CoinDetails = React.lazy(() =>
  import("./components/Coin Components/CoinDetails")
);

const App = () => {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div className="fallback bg-dark d-flex align-items-center justify-content-center flex-grow-1">
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          </div>
        }
      >
        <Header />
        <div className="appcontent bg-dark">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/coins/:coinId" component={CoinDetails} />
          </Switch>
        </div>
        <AuthenticationAlert/>
      </Suspense>
    </div>
  );
};

export default App;
