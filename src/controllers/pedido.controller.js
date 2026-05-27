const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
    
    try {const lista = await prisma.pedidos.findMany()

    res.status(200).json(lista).end();

    } catch (error) {
         console.error("Erro ao listar pedidos:", error);

        return res.status(500).json({ 
            error: "Não foi possível listar pedidos."
        });
    }
}

const cadastrar = async (req, res) => {
    
    try {const { produto, usuarioId } = req.body;

    const item = await prisma.pedidos.create({
        data: {
            produto,
            usuarioId
        }
    })
    res.status(201).json(item).end();

    } catch (error) {
         console.error("Erro ao cadastrar pedido:", error);

        return res.status(500).json({ 
            error: "Não foi possível cadastrar pedido."
        });
    }
}

const deletar = async (req, res) => {
    
    try {const { id } = req.params;

    const excluir = await prisma.pedidos.delete({
        where: {
            id: Number(id)
        }
    });
    res.status(200).json(excluir);

    } catch (error) {
         console.error("Erro ao deletar pedido:", error);

        return res.status(500).json({ 
            error: "Não foi possível deletar pedido."
        });
    }
}

const listarPorId = async (req, res) => {
    
    try {const { id } = req.params;

    const lista = await prisma.pedidos.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!lista) {
            return res.status(404).json({ error: "Pedido não encontrado." });
        }

        res.status(200).json(lista);

    } catch (error) {
         console.error("Erro ao listar pedido por ID:", error);

        return res.status(500).json({ 
            error: "Não foi possível listar pedido por ID."
        });
    }
}

const atualizar = async (req, res) => {

    try {const { id } = req.params;

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
    res.status(200).json(item);

    } catch (error) {
         console.error("Erro ao atualizar pedido:", error);

        return res.status(500).json({ 
            error: "Não foi possível atualizar pedido."
        });
    }
}

module.exports = {
    listar,
    cadastrar,
    deletar,
    listarPorId,
    atualizar
};