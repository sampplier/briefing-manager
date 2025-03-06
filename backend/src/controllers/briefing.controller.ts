import { Request, Response } from "express";
import BriefingService from "../services/briefing.service";

class BriefingController {
    async criar(req: Request, res: Response) {
        try {
            const { nome, descricao, estado } = req.body;
            const briefing = await BriefingService.criarBriefing(nome, descricao, estado);
            return res.status(201).json(briefing);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao criar briefing." });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const { estado } = req.query;
            const briefings = await BriefingService.listarBriefings(estado as any);
            return res.json(briefings);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao listar briefings." });
        }
    }

    async editar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { nome, descricao, estado } = req.body;
            const briefing = await BriefingService.editarBriefing(id, nome, descricao, estado);
            return res.json(briefing);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao editar briefing." });
        }
    }

    async remover(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await BriefingService.removerBriefing(id);
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erro ao remover briefing." });
        }
    }
}

const briefingController = new BriefingController();
export default briefingController;

