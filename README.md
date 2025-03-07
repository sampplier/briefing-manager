# 📌 Briefing Manager

O **Briefing Manager** é um sistema para gerenciar briefings de clientes, permitindo o cadastro, listagem, edição e remoção de briefings. O sistema conta com filtros por estado e testes automatizados.

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Frontend**: React.js, Vite, TypeScript
- **Testes**: Jest (backend), Vitest (frontend)
- **CI/CD**: GitHub Actions
- **Docker**: Docker e Docker Compose

---

## ⚙️ Funcionalidades

✅ Cadastrar um briefing  
✅ Listar todos os briefings  
✅ Filtrar briefings por estado (Negociação, Finalizado, Aprovado)  
✅ Editar um briefing  
✅ Remover um briefing  
✅ Testes automatizados no backend e frontend  
✅ CI/CD no GitHub Actions para rodar testes automaticamente  
✅ Autenticação via JWT

---

## 📂 Estrutura do Projeto

```bash
briefing-manager/
│── backend/          # API em Node.js com Express e Prisma
│── frontend/         # Aplicação React.js com Vite
│── .github/workflows/ # Configuração de CI/CD
│── docker-compose.yml # Orquestração dos containers (banco, backend, frontend)
│── README.md          # Documentação do projeto
