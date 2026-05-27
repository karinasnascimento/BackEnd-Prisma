const prisma = require("../data/prisma.js");

const listar = async (req, res) => {
                            //no db usuários-> traga todos 
    try {const lista = await prisma.usuario.findMany()
       res.status(200).json(lista).end(); 

    } catch (error) {
         console.error("Erro ao listar usuários:", error);

        return res.status(500).json({ 
            error: "Não foi possível buscar a lista de usuários."
        });
    }
}

const cadastrar = async (req, res) => {
    
    try {const { nome, email, idade, senha } = req.body;

    const item = await prisma.usuario.create({
        data: {
            nome,
            idade,
            senha,
            email
        }
    })
    res.status(201).json(item).end();

    } catch (error) {
         console.error("Erro ao cadastrar usuário:", error);

        return res.status(500).json({ 
            error: "Não foi possível cadastrar usuário."
        });
    }
}

const deletar = async (req, res) => {
    
    try {const { id } = req.params;

    const excluir = await prisma.usuario.delete({
        where: {
            id: Number(id)
        }
    });
    res.status(200).json(excluir);

    } catch (error) {
         console.error("Erro ao deletar usuário:", error);

        return res.status(500).json({ 
            error: "Não foi possível deletar usuário."
        });
    }
}

const listarPorId = async (req, res) => {
    try {const { id } = req.params;

    const lista = await prisma.usuario.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!lista) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.status(200).json(lista);

    } catch (error) {
         console.error("Erro ao listar usuário por ID:", error);

        return res.status(500).json({ 
            error: "Não foi possível listar usuário por ID."
        });
    }
}

const atualizar = async (req, res) => {

    try {const { id } = req.params;

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
    res.status(200).json(item);

    } catch (error) {
         console.error("Erro ao atualizar usuário:", error);

        return res.status(500).json({ 
            error: "Não foi possível atualizar usuário."
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