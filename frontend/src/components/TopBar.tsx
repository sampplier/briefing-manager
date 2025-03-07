import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../pages/styles/TopBar.css";// Importação do CSS
const Topbar = () => {
    const auth = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {auth?.user ? (
                    <Button color="inherit" onClick={auth.logout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Cadastrar</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
