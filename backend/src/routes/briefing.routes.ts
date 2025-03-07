import { Router, Request, Response, NextFunction } from "express";
import briefingController from "../controllers/briefing.controller";
import  authController  from "../controllers/auth.controller";

const router: Router = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/", asyncHandler((req: Request, res: Response) => briefingController.criar(req, res)));
router.get("/", asyncHandler((req: Request, res: Response) => briefingController.listar(req, res)));
router.put("/:id", asyncHandler((req: Request, res: Response) => briefingController.editar(req, res)));
router.delete("/:id", asyncHandler((req: Request, res: Response) => briefingController.remover(req, res)));
router.post("/register", asyncHandler((req: Request, res: Response) => authController.register(req, res)));
router.post("/login", asyncHandler((req: Request, res: Response) => authController.login(req, res)));

export default router;
