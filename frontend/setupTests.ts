import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { beforeAll, afterEach, afterAll } from "vitest";

// Exemplo de handlers para interceptar requisições
const server = setupServer(
    rest.get("/api/briefings", (req, res, ctx) => {
        return res(ctx.json([{ id: 1, nome: "Briefing Teste" }]));
    })
);

// Inicializa o MSW antes dos testes
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

