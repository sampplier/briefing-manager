import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BriefingForm from "../BriefingForm";

describe("BriefingForm", () => {
    test("renderiza formulário e permite preencher os campos", () => {
        render(
            <BrowserRouter>
                <BriefingForm />
            </BrowserRouter>
        );

        const nomeInput = screen.getByLabelText(/Nome do Cliente/i);
        const descricaoInput = screen.getByLabelText(/Descrição/i);
        const selectEstado = screen.getByLabelText(/Estado/i);

        fireEvent.change(nomeInput, { target: { value: "Novo Cliente" } });
        fireEvent.change(descricaoInput, { target: { value: "Nova descrição" } });
        fireEvent.change(selectEstado, { target: { value: "aprovado" } });

        expect(nomeInput).toHaveValue("Novo Cliente");
        expect(descricaoInput).toHaveValue("Nova descrição");
        expect(selectEstado).toHaveValue("aprovado");
    });
});
