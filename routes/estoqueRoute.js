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
        console.log(req.body);
        res.status(201).json(resposta);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao cadastrar produto" });
    }
})

export default router;