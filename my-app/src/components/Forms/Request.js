import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Select, MenuItem } from "@mui/material";
import { useRequestContext } from "../../hooks/useRequestsContext";
import { useAuthContext } from "../../hooks/useAuthContext";



export default function Request() {
  const {dispatch} = useRequestContext();
  const {user} = useAuthContext();
  const [type, setType] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
// console.log(user)
    if(!user){
      setError('You must be logged in')
      return
    }
    const studentrequest = { title, type, recipient, details };

    const response = await fetch("/api/requests", {
      method: "POST",
      body: JSON.stringify(studentrequest),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setType("");
      setRecipient("");
      setTitle("");
      setDetails("");
      setError(null);
      dispatch({type: 'CREATE_REQUEST', payload: json})

    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400 }}
    >

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="requesttitle"
            required
            fullWidth
            id="firstName"
            label="Request Title"
            onChange={handleTitleChange}
            value={title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={type}
            required
            displayEmpty
            fullWidth
            onChange={handleTypeChange} // Attach the event handler
            label="Type"
          >
            <MenuItem disabled value="">
              <p style={{ color: "#ccc" }}>Request Type</p>
            </MenuItem>
            <MenuItem value={"Academic Request"}>Academic Request</MenuItem>
            <MenuItem value={"Administrative Request"}>Administrative Request</MenuItem>
          </Select>
        </Grid>
        {type === "Academic Request" && ( // Conditionally render recipient component
          <Grid item xs={12}>
            <Select
              value={recipient}
              required
              fullWidth
              onChange={handleRecipientChange}
              label="Recipient"
            >
              <MenuItem value={"Facilitator Name"}>Facilitator Name</MenuItem>
            </Select>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-multiline-static"
            label="Details"
            multiline
            rows={4}
            placeholder="I would like to..."
            onChange={handleDetailsChange}
            value={details}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
      {error && <div className="error">{error}</div>}
    </Box>
  );
}
