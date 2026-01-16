import estoqueModel from "../models/estoqueModel.js";

class estoqueController {
    async listarEstoque() {
        return await estoqueModel.listarEstoque();
    }

    async cadastrarProduto(dados) {
        return await estoqueModel.cadastrarProduto(dados);
    }

    async listarProdCadastrado(idProduct) {
        return await estoqueModel.listarProdCadastrado(idProduct);
    }

    async attProdCadastrado(idProduct, dados) {
        return await estoqueModel.attProdCadastrado(idProduct, dados);
    }
}

export default new estoqueController();