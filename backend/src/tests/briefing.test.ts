import request from "supertest";
import app from "../server";
import prismaTest from "../../prisma/test.client";

beforeAll(async () => {
    await prismaTest.briefing.deleteMany();
});

afterAll(async () => {
    await prismaTest.$disconnect();
});

describe("Briefing API", () => {
    it("Deve criar um briefing", async () => {
        const res = await request(app).post("/briefings").send({
            nome: "Cliente Teste",
            descricao: "Descrição Teste",
            estado: "negociacao",
        });
        expect(res.status).toBe(201);
        expect(res.body.nome).toBe("Cliente Teste");
    });

    it("Deve listar briefings", async () => {
        const res = await request(app).get("/briefings");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Deve editar um briefing", async () => {
        const briefing = await prismaTest.briefing.findFirst();
        const res = await request(app).put(`/briefings/${briefing?.id}`).send({
            nome: "Cliente Atualizado",
        });
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe("Cliente Atualizado");
    });

    it("Deve remover um briefing", async () => {
        const briefing = await prismaTest.briefing.findFirst();
        const res = await request(app).delete(`/briefings/${briefing?.id}`);
        expect(res.status).toBe(204);
    });
});
