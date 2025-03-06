import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Select, MenuItem, Typography } from "@mui/material";

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
        <div>
            <Typography variant="h4">{id ? "Editar Briefing" : "Novo Briefing"}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Nome do Cliente" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />
                <TextField label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} fullWidth multiline />
                <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <MenuItem value="negociacao">Negociação</MenuItem>
                    <MenuItem value="finalizado">Finalizado</MenuItem>
                    <MenuItem value="aprovado">Aprovado</MenuItem>
                </Select>
                <Button type="submit" variant="contained">Salvar</Button>
            </form>
        </div>
    );
};

export default BriefingForm;
