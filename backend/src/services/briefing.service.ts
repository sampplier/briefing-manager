import prisma from "/home/sampplier/Documentos/briefing-manager/backend/src/prisma/client";
import { Briefing, Estado } from "@prisma/client";

class BriefingService {
    async criarBriefing(nome: string, descricao: string, estado: Estado): Promise<Briefing> {
        return await prisma.briefing.create({
            data: { nome, descricao, estado }
        });
    }

    async listarBriefings(estado?: Estado): Promise<Briefing[]> {
        return await prisma.briefing.findMany({
            where: estado ? { estado } : {}
        });
    }
    async editarBriefing(id: number, nome?: string, descricao?: string, estado?: Estado) {
        return await prisma.briefing.update({
            where: { id },
            data: { nome, descricao, estado },
        });
    }

    async removerBriefing(id: number) {
        return await prisma.briefing.delete({ where: { id } });
    }
}

export default new BriefingService();
