import { Router } from "express";
import BriefingController from "../controllers/briefing.controller.ts";


const router = Router();

router.post("/", (req, res) => BriefingController.criar(req, res));
router.get("/", (req, res) => BriefingController.listar(req, res));
router.put("/:id", (req, res) => BriefingController.editar(req, res));
router.delete("/:id", (req, res) => BriefingController.remover(req, res));


export default router;
