import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboardCustomize, MdLogout } from "react-icons/md";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";

const Sidebar = (props) => {
  const {logout} = useLogout()
  const [isOpen, setIsOpen] = useState(true);

  const bottomitem = [
    {
      path: "/signin",
      name: "Logout",
      icon: <MdLogout />,
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="nav__container">
      <div className="sidebar">
        {" "}
        <h1 style={{ margin: "15px", fontSize: 25, color: "#fff" }}>
          {" "}
          {props.role}
        </h1>
        <div className="mid__section">
          <NavLink className="link" activeclassname="active">
            <div className="icon">
              <MdOutlineDashboardCustomize />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              Requests
            </div>
          </NavLink>
        </div>
        <div className="bottom__section">
          <NavLink
            className="link"
            activeclassname="active"
            onClick={handleLogout}
          >
            <div>{bottomitem[0].icon}</div>
            <div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text "
              >
                {bottomitem[0].name}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
 
          <main
            style={{ width: "100%", marginLeft: isOpen ? "160px" : "60px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ marginBottom: "20px" }}>
                Welcome back {props.name},
              </h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <Avatar>{props.avatar}</Avatar>
                <p> {props.email}</p>
              </div>
            </div>
            {props.children}
          </main>
    </div>
  );
};

export default Sidebar;
