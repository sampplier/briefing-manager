import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";

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
        <div>
            <Typography variant="h4">Briefings</Typography>
            <Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="negociacao">Negociação</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
                <MenuItem value="aprovado">Aprovado</MenuItem>
            </Select>
            <Button variant="contained" onClick={() => navigate("/create")}>
                Novo Briefing
            </Button>

            {briefings
                .filter((b) => filtro === "todos" || b.estado === filtro)
                .map((briefing) => (
                    <Card key={briefing.id} style={{ margin: "10px 0" }}>
                        <CardContent>
                            <Typography variant="h6">{briefing.nome}</Typography>
                            <Typography>{briefing.descricao}</Typography>
                            <Typography>Estado: {briefing.estado}</Typography>
                            <Button onClick={() => navigate(`/edit/${briefing.id}`)}>Editar</Button>
                            <Button onClick={() => handleDelete(briefing.id)}>Remover</Button>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
};

export default BriefingList;
