import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const authService = {
    async register(nome: string, email: string, senha: string) {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = await prisma.usuario.create({
            data: { nome, email, senha: hashedPassword },
        });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        return { user, token };
    },

    async login(email: string, senha: string) {
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user) throw new Error("Usuário não encontrado");

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) throw new Error("Senha incorreta");

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        return { user, token };
    }
};
