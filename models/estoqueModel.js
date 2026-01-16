import { pool } from "../src/database/db.js";

class estoqueModel {
    async listarEstoque() {
        const [resp] = await pool.query("SELECT * FROM product");
        return resp;
    }

    async cadastrarProduto({ product_code, description, category }) {
        const sql = `
            INSERT INTO product (product_code, description, category)
            VALUES (?, ?, ?);
        `;

        const [resp] = await pool.query(sql, [
            product_code,
            description,
            category
        ]);

        return {
            mensagem: "Produto cadastrado com sucesso"
        };
    }

    async listarProdCadastrado(idProduct) {
        const sql = "SELECT * FROM product WHERE idproduct = ?";
        const [resp] = await pool.query(sql, [idProduct]);
        return resp;
    }

    async attProdCadastrado(idProduct, { product_code, description, category }) {
        const sql = `
            UPDATE product SET
            product_code = ?,
            description = ?,
            category = ?
            WHERE idproduct = ?;
        `;

        const [resp] = await pool.query(sql, [
            product_code,
            description,
            category,
            idProduct
        ]);

        if (resp.affectedRows === 0) {
            return { mensagem: "Produto não encontrado" };
        }

        return {
            mensagem: "Produto atualizado com sucesso"
        };
    }
}

export default new estoqueModel();