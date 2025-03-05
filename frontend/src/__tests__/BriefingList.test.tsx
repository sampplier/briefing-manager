import { render, screen } from "@testing-library/react";
import BriefingList from "../components/BriefingList";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("http://localhost:3000/briefings", (req, res, ctx) => {
        return res(ctx.json([
            { id: 1, nome: "Cliente Teste", descricao: "Descrição", estado: "negociacao" }
        ]));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Deve exibir a lista de briefings", async () => {
    render(<BriefingList />);
    const briefing = await screen.findByText("Cliente Teste");
    expect(briefing).toBeInTheDocument();
});
