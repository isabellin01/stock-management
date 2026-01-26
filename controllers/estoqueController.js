import estoqueModel from "../models/estoqueModel.js";

class estoqueController {
    async listarEstoque() {
        return await estoqueModel.listarEstoque();
    }

    async listCompanies(type) {
        return await estoqueModel.listCompanies(type);
    }

    async listProducts(type) {
        return await estoqueModel.listProducts(type);
    }

    async registerExp(data) {
        return await estoqueModel.registerExp(data);
    }

    async listarProdCadastrado(idProduct) {
        return await estoqueModel.listarProdCadastrado(idProduct);
    }

    async attProdCadastrado(idProduct, data) {
        return await estoqueModel.attProdCadastrado(idProduct, data);
    }
}

export default new estoqueController();