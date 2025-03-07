import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import "./styles/Briefing.css"; // Importação do CSS

interface Briefing {
    id: number;
    nome: string;
    descricao: string;
    estado: "negociacao" | "finalizado" | "aprovado";
}

const BriefingList = () => {
    const [briefings, setBriefings] = useState<Briefing[]>([]);
    const [filtro, setFiltro] = useState("todos");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/briefings").then((res) => setBriefings(res.data));
    }, []);

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:5000/briefings/${id}`);
        setBriefings(briefings.filter((b) => b.id !== id));
    };

    return (
<div className="briefing-container">
    <Typography variant="h4" className="briefing-title">Briefings</Typography>
    <div className="briefing-filter">
        <Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="negociacao">Negociação</MenuItem>
            <MenuItem value="finalizado">Finalizado</MenuItem>
            <MenuItem value="aprovado">Aprovado</MenuItem>
        </Select>
        <Button variant="contained" className="briefing-button" onClick={() => navigate("/create")}>
            Novo Briefing
        </Button>
    </div>

    {briefings
        .filter((b) => filtro === "todos" || b.estado === filtro)
        .map((briefing) => (
            <Card key={briefing.id} className="briefing-card">
                <CardContent>
                    <Typography variant="h6">{briefing.nome}</Typography>
                    <Typography>{briefing.descricao}</Typography>
                    <Typography>Estado: {briefing.estado}</Typography>
                    <Button className="briefing-button edit-button" onClick={() => navigate(`/edit/${briefing.id}`)}>Editar</Button>
                    <Button className="briefing-button remove-button" onClick={() => handleDelete(briefing.id)}>Remover</Button>
                </CardContent>
            </Card>
        ))}
</div>
    );
};

export default BriefingList;
