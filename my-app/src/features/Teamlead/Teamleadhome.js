import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Sidebar from "../../components/Navbar/Sidebar";
import { useEffect, useState } from "react";
import { useRequestContext } from "../../hooks/useRequestsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Cardcontainer from "../../components/Cards";

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function Teamleadhome() {
  const { requests, dispatch } = useRequestContext();
  const { user } = useAuthContext();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("/api/requests", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_REQUESTS", payload: json });
      }
    };
    if (user) {
      fetchRequests();
    }
  }, [dispatch, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {user && (
        <Sidebar
          name={user.lastName}
          role={user.role}
          email={user.email}
          avatar="TL"
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="View All Requests" {...a11yProps(0)} />
                <Tab label="Academic Requests" {...a11yProps(1)} />
                <Tab label="Administrative Requests" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container spacing={2}>
                {requests &&
                  requests.map((data, index) => (
                    <Grid item key={data._id} xs={12} sm={6} md={4} lg={3}>
                      <Cardcontainer
                        cardId={data._id} // Pass a unique identifier for the card
                        title={data.title}
                        type={data.type}
                        details={data.details}
                        recipient={data.recipient}
                      />
                    </Grid>
                  ))}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Grid container spacing={2}>
                {requests &&
                  requests
                    .filter((data) => data.type === "Academic Request")
                    .map((data, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Cardcontainer
                          cardId={data._id} // Pass a unique identifier for the card
                          title={data.title}
                          type={data.type}
                          details={data.details}
                          recipient={data.recipient}
                        />
                      </Grid>
                    ))}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Grid container spacing={2}>
                {requests &&
                  requests
                    .filter((data) => data.type === "Administrative Request")
                    .map((data, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Cardcontainer
                          cardId={data._id} // Pass a unique identifier for the card
                          title={data.title}
                          type={data.type}
                          details={data.details}
                          recipient={data.recipient}
                        />
                      </Grid>
                    ))}
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              Item Four
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              Item Five
            </CustomTabPanel>
          </Box>
        </Sidebar>
      )}
    </div>
  );
}
