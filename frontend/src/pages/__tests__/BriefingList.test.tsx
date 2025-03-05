import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BriefingList from "../BriefingList";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("http://localhost:3000/briefings", (req, res, ctx) => {
        return res(
            ctx.json([
                { id: 1, nome: "Cliente A", descricao: "Projeto X", estado: "negociacao" },
                { id: 2, nome: "Cliente B", descricao: "Projeto Y", estado: "aprovado" },
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("BriefingList", () => {
    test("renderiza lista de briefings", async () => {
        render(
            <BrowserRouter>
                <BriefingList />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Cliente A")).toBeInTheDocument();
            expect(screen.getByText("Cliente B")).toBeInTheDocument();
        });
    });
});
