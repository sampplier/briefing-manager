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
const briefing_service_1 = __importDefault(require("../services/briefing.service"));
class BriefingController {
    criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, descricao, estado } = req.body;
                const briefing = yield briefing_service_1.default.criarBriefing(nome, descricao, estado);
                return res.status(201).json(briefing);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao criar briefing." });
            }
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { estado } = req.query;
                const briefings = yield briefing_service_1.default.listarBriefings(estado);
                return res.json(briefings);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Erro ao listar briefings." });
            }
        });
    }
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { nome, descricao, estado } = req.body;
                const briefing = yield briefing_service_1.default.editarBriefing(id, nome, descricao, estado);
                return res.json(briefing);
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao editar briefing." });
            }
        });
    }
    remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield briefing_service_1.default.removerBriefing(id);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao remover briefing." });
            }
        });
    }
}
const briefingController = new BriefingController();
exports.default = briefingController;
