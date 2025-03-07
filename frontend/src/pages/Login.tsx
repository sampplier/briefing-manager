import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import "./styles/Auth.css"; // Importação do CSS

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth?.login(email, senha);
            navigate("/");
        } catch {
            alert("Erro ao fazer login");
        }
    };

    return (
        <div className="auth-container">
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Senha" fullWidth type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Button className="auth-button" type="submit" variant="contained">Entrar</Button>
            </form>
        </div>
    );
};

export default Login;
