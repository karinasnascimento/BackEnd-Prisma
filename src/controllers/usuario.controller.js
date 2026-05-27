const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    //no db usuários-> traga todos 
    const lista = await prisma.usuario.findMany()

    res.status(200).json(lista).end();

}

const cadastrar = async (req, res) => {
    const { nome, email, idade, senha } = req.body;

    const item = await prisma.usuario.create({
        data: {
            nome,
            idade,
            senha,
            email
        }
    })

    res.json(item).status(201).end();
}

const deletar = async (req, res) => {
    const { id } = req.params;

    const excluir = await prisma.usuario.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json(excluir);
}

const listarPorId = async (req, res) => {
    const { id } = req.params;

    const lista = await prisma.usuario.findUnique({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json(lista);
}

const atualizar = async (req, res) => {

    const { id } = req.params;

    const { nome, email, idade, senha } = req.body;

    const item = await prisma.usuario.update({
        where: {
            id: Number(id)
        },
        data: {
            nome,
            idade,
            senha,
            email
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