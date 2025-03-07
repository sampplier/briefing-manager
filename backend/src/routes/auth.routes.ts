import { Router } from "express";
import { authService } from "../services/auth.service";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const result = await authService.register(nome, email, senha);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await authService.login(email, senha);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export { router as authRoutes };
