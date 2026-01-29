import { pool } from "../database/db.js";

class estoqueModel {
    async listarEstoque() {
        const [resp] = await pool.query("SELECT * FROM estoque_view;");
        return resp;
    }

    async listCompanies(type) {
        const [resp] = await pool.query(`SELECT name FROM partner WHERE partner_type = ? OR partner_type = 'BOTH';`,
        [type]
        );
        return resp;
    }

    async listProducts(type) {
        const [resp] = await pool.query(`SELECT prod_desc FROM product_view WHERE prod_ctg = ?;`,
        [type]
        );
        return resp;
    }

    async registerProd( data ) {
        const sql = `
            INSERT INTO invoice (idpartner, nf_number, icms_price, issue_date, due_date, order_number, dplbol, payment)
            VALUES ((SELECT idclient FROM partner WHERE name = ?), ?, ?, ?, ?, ?, ?, ?);
        `;

        const [resp] = await pool.query(sql, [
            data.partner,
            data.nf_number,
            data.icms_price,
            data.issue_date,
            data.due_date,
            data.order_number,
            data.dplbol,
            data.payment
        ]);

        return {
            success: true,
            mensagem: "Product registered successfully"
        };
    }

    // async listarProdCadastrado(idProduct) {
    //     const sql = "SELECT * FROM product WHERE idproduct = ?";
    //     const [resp] = await pool.query(sql, [idProduct]);
    //     return resp;
    // }

    // async attProdCadastrado(idProduct, { product_code, description, category }) {
    //     const sql = `
    //         UPDATE product SET
    //         product_code = ?,
    //         description = ?,
    //         category = ?
    //         WHERE idproduct = ?;
    //     `;

    //     const [resp] = await pool.query(sql, [
    //         product_code,
    //         description,
    //         category,
    //         idProduct
    //     ]);

    //     if (resp.affectedRows === 0) {
    //         return { mensagem: "Produto não encontrado" };
    //     }

    //     return {
    //         mensagem: "Produto atualizado com sucesso"
    //     };
    // }
}

export default new estoqueModel();