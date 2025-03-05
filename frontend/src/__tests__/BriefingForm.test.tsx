import { render, screen, fireEvent } from "@testing-library/react";
import BriefingForm from "../components/BriefingForm";

test("Deve preencher e enviar o formulário", async () => {
    render(<BriefingForm />);

    fireEvent.change(screen.getByLabelText(/Nome do Cliente/i), {
        target: { value: "Novo Cliente" }
    });

    fireEvent.change(screen.getByLabelText(/Descrição/i), {
        target: { value: "Nova Descrição" }
    });

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(await screen.findByText("Novo Cliente")).toBeInTheDocument();
});
