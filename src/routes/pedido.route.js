const express = require("express");

const route = express.Router();

const { listar, cadastrar, deletar, listarPorId, atualizar } = require("../controllers/pedido.controller.js");

route.get("/listar", listar);
route.post("/cadastrar", cadastrar);
route.delete("/deletar/:id", deletar);
route.get("/listar/:id", listarPorId);
route.put("/atualizar/:id", atualizar);

module.exports = route;