import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import "./styles/Auth.css"; // Importação do CSS

const Register = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/register", { nome, email, senha });
            navigate("/login");
        } catch {
            alert("Erro ao cadastrar");
        }
    };

    return (
        <div className="auth-container">
            <Typography variant="h4">Cadastro</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Senha" fullWidth type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <Button className="auth-button" type="submit" variant="contained">Cadastrar</Button>
            </form>
        </div>
    );
};

export default Register;
