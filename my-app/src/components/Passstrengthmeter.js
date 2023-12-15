import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    border: "1px solid #dadde9",
  },
}));

const Passstrengthmeter = ({
  requirements,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handlePasswordChange,
}) => {
  const calculatePasswordStrength = (requirements) => {
    const { lower, upper, number, special, length } = requirements;
    const fulfilledRequirements = [
      lower,
      upper,
      number,
      special,
      length,
    ].filter((req) => req);

    switch (fulfilledRequirements.length) {
      case 0:
        return "Weak";
      case 1:
      case 2:
        return "Fair";
      case 3:
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "Weak"; // Handle any other cases as 'Weak'
    }
  };

  return (
    <div className="wrapper">
      <div className="box">
        <div className="input-with-icon-div form-control">
          <StyledTooltip
            arrow
            placement="right"
            title={
              <div style={{ padding: "20px", maxWidth: 300 }}>
                <p style={{ fontSize: 14, fontWeight: 400 }}>
                  Password must meet the following requirements:{" "}
                </p>
                <div style={{ marginTop: "10px", fontSize: 13 }}>
                  <div
                    className={`requirements-item ${
                      requirements.lower ? "validated" : "not-validated"
                    }`}
                  >
                    {requirements.lower ? (
                      <CheckRoundedIcon className="list-icon green" />
                    ) : (
                      <ClearRoundedIcon className="list-icon" />
                    )}
                    <span className="text-content">
                      At least one lowercase letter
                    </span>
                  </div>
                  <div
                    className={`requirements-item ${
                      requirements.upper ? "validated" : "not-validated"
                    }`}
                  >
                    {requirements.upper ? (
                      <CheckRoundedIcon className="list-icon green" />
                    ) : (
                      <ClearRoundedIcon className="list-icon" />
                    )}
                    <span className="text-content">
                      At least one uppercase letter
                    </span>
                  </div>
                  <div
                    className={`requirements-item ${
                      requirements.number ? "validated" : "not-validated"
                    }`}
                  >
                    {requirements.number ? (
                      <CheckRoundedIcon className="list-icon green" />
                    ) : (
                      <ClearRoundedIcon className="list-icon" />
                    )}
                    <span className="text-content">At least one number</span>
                  </div>
                  <div
                    className={`requirements-item ${
                      requirements.special ? "validated" : "not-validated"
                    }`}
                  >
                    {requirements.special ? (
                      <CheckRoundedIcon className="list-icon green" />
                    ) : (
                      <ClearRoundedIcon className="list-icon" />
                    )}
                    <span className="text-content">
                      At least one special characters
                    </span>
                  </div>
                  <div
                    className={`requirements-item ${
                      requirements.length ? "validated" : "not-validated"
                    }`}
                  >
                    {requirements.length ? (
                      <CheckRoundedIcon className="list-icon green" />
                    ) : (
                      <ClearRoundedIcon className="list-icon" />
                    )}
                    <span className="text-content">At least 8 characters</span>
                  </div>
                </div>
              </div>
            }
          >
            <div>
              <InputLabel>Password *</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                fullWidth
                name="password"
                autoComplete="new-password"
                onChange={handlePasswordChange}
              />
               <div>
                <p style={{ fontSize: 14, fontWeight: 400 }}>
                  Password Strength:{" "}
                  <span className={`password-strength-${calculatePasswordStrength(requirements).toLowerCase()}`}>
                    {calculatePasswordStrength(requirements)}
                  </span>
                </p>
              </div>
            </div>
          </StyledTooltip>
        </div>
      </div>
    </div>
  );
};

export default Passstrengthmeter;
