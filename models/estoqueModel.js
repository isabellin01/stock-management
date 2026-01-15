import { pool } from "../db.js";

class estoqueModel {
    async listarEstoque() {
        const sql = "SELECT * FROM product";
        try {
            const [resp] = await pool.query(sql);
            return resp;
        } catch (error) {
            console.error("Erro para listar estoque", error);
            throw error;
        }
    }

    async cadastrarProduto({ product_code, description, category }) {
        const sql = `INSERT INTO product (product_code, description, category) VALUES (?, ?, ?)`;
        try {
            const [resp] = await pool.query(sql, [product_code, description, category]);
            return resp;
        } catch (error) {
            console.error("Erro para cadastrar produto", error);
            throw error;
        }
    }
}

export default new estoqueModel();