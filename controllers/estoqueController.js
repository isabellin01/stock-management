import estoqueModel from "../models/estoqueModel.js";

class estoqueController {
    async listarEstoque() {
        return await estoqueModel.listarEstoque();
    }

    async cadastrarProduto(dados) {
        console.log(dados);
        return await estoqueModel.cadastrarProduto(dados);
    }
}

export default new estoqueController();