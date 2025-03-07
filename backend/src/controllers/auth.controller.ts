import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "secrettoken";
class AuthController{
    register = async (req: Request, res: Response) => {
        const { nome, email, senha } = req.body;
    
        const hashedPassword = await bcrypt.hash(senha, 10);
        try {
            const user = await prisma.usuario.create({
                data: { nome, email, senha: hashedPassword },
            });
    
            res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(400).json({ error: "Erro ao cadastrar usuário" });
        }
    };
    
    login = async (req: Request, res: Response) => {
        const { email, senha } = req.body;
    
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: "Usuário não encontrado" });
    
        const validPassword = await bcrypt.compare(senha, user.senha);
        if (!validPassword) return res.status(401).json({ error: "Senha inválida" });
    
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    
        res.json({ token });
    };
}
const authController = new AuthController();
export default new AuthController();
