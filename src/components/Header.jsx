import React, { useContext } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { AuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {

   const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout(); // clears localStorage token
    navigate("/login"); // redirect to login page
  }

  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;


