import { Router } from "express";
const router = Router();
import estoqueController from "../controller/estoqueController.js"

router.get("/listarEstoque", async (req, res) => {
    const resposta = estoqueController;
    res.send(resposta)
})

export default router;