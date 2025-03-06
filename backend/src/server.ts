import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/briefing.routes"; 
dotenv.config({ path: './src/.env' });

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/briefings", router);
app.get("/", (req, res) => {
    res.send("API do Gestor de Briefings está rodando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
export default app;