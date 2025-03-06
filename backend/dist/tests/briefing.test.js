"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const test_client_1 = __importDefault(require("../prisma/test.client"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_client_1.default.briefing.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_client_1.default.$disconnect();
}));
describe("Briefing API", () => {
    it("Deve criar um briefing", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/briefings").send({
            nome: "Cliente Teste",
            descricao: "Descrição Teste",
            estado: "negociacao",
        });
        expect(res.status).toBe(201);
        expect(res.body.nome).toBe("Cliente Teste");
    }));
    it("Deve listar briefings", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get("/briefings");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    it("Deve editar um briefing", () => __awaiter(void 0, void 0, void 0, function* () {
        const briefing = yield test_client_1.default.briefing.findFirst();
        const res = yield (0, supertest_1.default)(server_1.default).put(`/briefings/${briefing === null || briefing === void 0 ? void 0 : briefing.id}`).send({
            nome: "Cliente Atualizado",
        });
        expect(res.status).toBe(200);
        expect(res.body.nome).toBe("Cliente Atualizado");
    }));
    it("Deve remover um briefing", () => __awaiter(void 0, void 0, void 0, function* () {
        const briefing = yield test_client_1.default.briefing.findFirst();
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/briefings/${briefing === null || briefing === void 0 ? void 0 : briefing.id}`);
        expect(res.status).toBe(204);
    }));
});
