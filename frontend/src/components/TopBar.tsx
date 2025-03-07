import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../pages/styles/TopBar.css"; // Importação do CSS

const Topbar = () => {
  const auth = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar className="topbar">
        {/* Texto na esquerda */}
        <Typography variant="h6" className="topbar-title">
          Gestor de Briefings
        </Typography>

        <div className="topbar-buttons">
          {auth?.user ? (
            <Button className="topbar-button" onClick={auth.logout}>Logout</Button>
          ) : (
            <>
              <Button className="topbar-button" component={Link} to="/login">Login</Button>
              <Button className="topbar-button" component={Link} to="/register">Cadastrar</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
