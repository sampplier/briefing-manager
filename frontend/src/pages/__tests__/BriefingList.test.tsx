import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BriefingList from "../BriefingList";
import { rest } from "msw";  // Apenas importa o 'rest' para fazer mocks de requests
import { setupServer } from "msw/node";  // Importa 'setupServer' para configurar o servidor de mocks

// Criando o servidor de mock
const server = setupServer(
  rest.get("http://localhost:3000/briefings", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, nome: "Cliente A", descricao: "Projeto X", estado: "negociacao" },
        { id: 2, nome: "Cliente B", descricao: "Projeto Y", estado: "aprovado" },
      ])
    );
  })
);

// Configuração do servidor mock
beforeAll(() => server.listen());  // Inicia o servidor antes dos testes
afterEach(() => server.resetHandlers());  // Reseta os mocks entre os testes
afterAll(() => server.close());  // Fecha o servidor após todos os testes

describe("BriefingList", () => {
  test("renderiza lista de briefings", async () => {
    render(
      <BrowserRouter>
        <BriefingList />
      </BrowserRouter>
    );

    // Espera até que os textos sejam encontrados
    await waitFor(() => {
      expect(screen.getByText("Cliente A")).toBeInTheDocument();
      expect(screen.getByText("Cliente B")).toBeInTheDocument();
    });
  });
});
z