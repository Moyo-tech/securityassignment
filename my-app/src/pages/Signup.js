import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Passstrengthmeter from "../components/Passstrengthmeter";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const defaultTheme = createTheme();

const SignUp = () => {
  const [role, setRole] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [requirements, setRequirements] = useState({
    lower: false,
    upper: false,
    number: false,
    special: false,
    length: false,
  });

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    setRequirements({
      lower: lower.test(value),
      upper: upper.test(value),
      number: number.test(value),
      special: special.test(value),
      length: length.test(value),
    });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any required fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Check if the password fulfills the requirements
    if (
      !(
        requirements.lower &&
        requirements.upper &&
        requirements.number &&
        requirements.special &&
        requirements.length
      )
    ) {
      alert("Password does not meet the requirements.");
      return;
    }
    await signup(firstName, lastName, email, password, role);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Passstrengthmeter
                  handlePasswordChange={handlePasswordChange}
                  requirements={requirements}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  showPassword={showPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  onChange={handleConfirmPasswordChange}
                />
                {passwordMatchError && (
                  <Typography variant="caption" color="error">
                    Passwords do not match.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Role</InputLabel>
                <Select value={role} fullWidth onChange={handleRoleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"teamlead"}>Team Lead</MenuItem>
                  <MenuItem value={"facilitator"}>Facilitator</MenuItem>
                  <MenuItem value={"student"}>Student</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {error && <div className="error">{error}</div>}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
