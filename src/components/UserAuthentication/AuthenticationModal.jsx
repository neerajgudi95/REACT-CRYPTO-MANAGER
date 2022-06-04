import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { Box, Tab, Tabs, Typography, Modal, Button } from "@mui/material";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "#ddd",
  // border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  // p: 2,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AuthenticationModal = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Button
        style={{ color: "black", backgroundColor: "gold" }}
        onClick={handleOpen}
      >
        LOGIN
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box style={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="basic tabs example"
            >
              <Tab label="LOGIN" {...a11yProps(0)} />
              <Tab label="SIGN UP" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value={value} index={0}>
              <LoginPage handleClose={handleClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignupPage handleClose={handleClose} />
            </TabPanel>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
