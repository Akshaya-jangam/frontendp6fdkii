import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem("token");

    // Redirect to login
    alert("You have been logged out.");
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
