import { Router } from "express";
const router = Router();
import estoqueController from "../controllers/estoqueController.js"

router.get("/listarEstoque", async (req, res) => {
    try {
        const resp = await estoqueController.listarEstoque();
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar estoque" });
    }
})

router.post(`/listCompanies`, async (req, res) => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: 'Partner type is required' });
        }

        const resp = await estoqueController.listCompanies(type);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({ error: "Error listing companies" });
    }
})

router.post(`/listProducts`, async (req, res) => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ error: 'Product type is required' });
        }

        const resp = await estoqueController.listProducts(type);
        res.status(200).json(resp);
    } catch (error) {
        res.status(500).json({ error: "Error listing products" });
    }
})

router.post("/registerNf", async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Products infos are required' });
        }

        const resp = await estoqueController.registerNf(data);
        res.status(200).json(resp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering products" });
    }
});

router.post("/registerNfitem", async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Product item infos are required' });
        }

        const resp = await estoqueController.registerNfitem(data);
        res.status(200).json(resp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error registering product item" });
    }
});

// router.get("/listarProdCadastrado/:idProduct", async (req, res) => {
//     const { idProduct } = req.params;
//     try {
//         const resp = await estoqueController.listarProdCadastrado(idProduct);
//         res.status(200).json(resp);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao listar produto cadastrado" });
//     }
// })

// router.put("/attProdCadastrado/:idProduct", async (req, res) => {
//     const { idProduct } = req.params;
//     const dados = req.body;
//     try {
//         const resp = await estoqueController.attProdCadastrado(idProduct, dados);
//         res.status(200).json(resp);
//     } catch (error) {
//         res.status(500).json({ error: "Erro ao atualizar produto cadastrado" });
//     }
// })

export default router;