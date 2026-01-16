import { Router } from "express";
const router = Router();
import estoqueController from "../controllers/estoqueController.js"

router.get("/listarEstoque", async (req, res) => {
    try {
        const resposta = await estoqueController.listarEstoque();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar estoque" });
    }
})

router.post("/cadastrarProduto", async (req, res) => {
    try {
        const resposta = await estoqueController.cadastrarProduto(req.body);
        res.status(201).json(resposta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar produto" });
    }
});

router.get("/listarProdCadastrado/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
        const resposta = await estoqueController.listarProdCadastrado(idProduct);
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar produto cadastrado" });
    }
})

router.put("/attProdCadastrado/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    const dados = req.body;
    try {
        const resposta = await estoqueController.attProdCadastrado(idProduct, dados);
        res.status(200).json(resposta);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar produto cadastrado" });
    }
})

export default router;