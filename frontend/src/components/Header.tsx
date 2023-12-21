import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      className="pt-4"
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          <Link to="/" className="nav-link">
            Home
          </Link>
          {auth?.isLoggedIn ? (
            <>
              <Link to="/pdf" className="nav-link">
                pdf
              </Link>
              <Link to="/questions" className="nav-link">
                model questions
              </Link>
              <Link to="/chat" className="nav-link">
                Go To Chat
              </Link>
              <Link to="/about" className="nav-link">
                about
              </Link>
              <Link to="/contact" className="nav-link">
                contact
              </Link>
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">
                about
              </Link>
              <Link to="/contact" className="nav-link">
                contact
              </Link>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
