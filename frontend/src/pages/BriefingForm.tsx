import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Select, MenuItem, Typography } from "@mui/material";
import "./styles/Briefing.css"; // Importação do CSS

const BriefingForm = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estado, setEstado] = useState("negociacao");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/briefings/${id}`).then((res) => {
                setNome(res.data.nome);
                setDescricao(res.data.descricao);
                setEstado(res.data.estado);
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const briefing = { nome, descricao, estado };

        if (id) {
            await axios.put(`http://localhost:5000/briefings/${id}`, briefing);
        } else {
            await axios.post("http://localhost:5000/briefings", briefing);
        }
        navigate("/");
    };

    return (
        <div className="briefing-container">
        <Typography variant="h4" className="briefing-title">{id ? "Editar Briefing" : "Novo Briefing"}</Typography>
        <form onSubmit={handleSubmit} className="briefing-form-container">
            <TextField 
                label="Nome do Cliente" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                fullWidth 
                required
            />
            <TextField 
                label="Descrição" 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                fullWidth 
                multiline 
                required
            />
            <Select value={estado} onChange={(e) => setEstado(e.target.value)} fullWidth>
                <MenuItem value="negociacao">Negociação</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
                <MenuItem value="aprovado">Aprovado</MenuItem>
            </Select>
            
            <div className="button-container">
                <Button type="submit" variant="contained" className="briefing-button save-button">Salvar</Button>
                <Button 
                    variant="outlined" 
                    className="briefing-button cancel-button" 
                    onClick={() => navigate("/")}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    </div>
    
    );
};

export default BriefingForm;