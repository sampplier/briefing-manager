"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const briefing_controller_1 = __importDefault(require("../controllers/briefing.controller"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post("/", asyncHandler((req, res) => briefing_controller_1.default.criar(req, res)));
router.get("/", asyncHandler((req, res) => briefing_controller_1.default.listar(req, res)));
router.put("/:id", asyncHandler((req, res) => briefing_controller_1.default.editar(req, res)));
router.delete("/:id", asyncHandler((req, res) => briefing_controller_1.default.remover(req, res)));
exports.default = router;
