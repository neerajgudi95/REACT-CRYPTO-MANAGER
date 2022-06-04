import React from "react";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../config/firebaseConfig";
import { signOut } from "firebase/auth";
import UserCoinWatchlist from "./UserCoinWatchlist";

export default function UserInfo() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { user, setAlert, watchList } = CryptoState();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAlert({
        open: true,
        message: "You have been logged out",
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <Avatar src={user.photoURL} alt={user.displayName || user.email} />
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div
            className="d-flex align-items-center justify-content-between flex-column bg-dark h-100 p-3"
            style={{ width: "350px" }}
          >
            <div className="user">
              <Avatar
                src={user.photoURL}
                alt={user.email.slice(0, 1).toUpperCase()}
                sx={{ width: 150, height: 150 }}
              />
              <h4 style={{ color: "white", marginTop: "10px" }}>
                {user.email}
              </h4>
            </div>
            <div
              className="w-100 h-100 m-2 bg-secondary rounded p-2"
              style={{ overflowY: "scroll" }}
            >
              <h4 className="text-center text-light">Watchlist</h4>
              <UserCoinWatchlist userCoinList={watchList} />
            </div>
            <Button
              style={{
                color: "black",
                backgroundColor: "gold",
                width: "100%",
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
