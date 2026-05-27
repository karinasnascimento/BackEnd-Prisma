const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    const lista = await prisma.pedidos.findMany()

    res.status(200).json(lista).end();

}

const cadastrar = async (req, res) => {
    const { produto, usuarioId } = req.body;

    const item = await prisma.pedidos.create({
        data: {
            produto,
            usuarioId
        }
    })

    res.json(item).status(201).end();
}

const deletar = async (req, res) => {
    const { id } = req.params;

    const excluir = await prisma.pedidos.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json(excluir);
}

const listarPorId = async (req, res) => {
    const { id } = req.params;

    const lista = await prisma.pedidos.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json(lista);
}

const atualizar = async (req, res) => {

    const { id } = req.params;

    const { produto, usuarioId } = req.body;

    const item = await prisma.pedidos.update({
        where: {
            id: Number(id)
        },
        data: {
            produto,
            usuarioId
        }
    })

    res.json(item).status(201);
}

module.exports = {
    listar,
    cadastrar,
    deletar,
    listarPorId,
    atualizar
};