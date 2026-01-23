function category(value) {
    const field = document.getElementById('dynamicFields');
    if (value == "EPI") {
        field.innerHTML = `
            <div id="fieldEpi" class="field">
                <label>Nome</label>
                <input type="text" id="nome" required>
                <label>Estoque atual</label>
                <input type="number" id="estoque" min="0" required>
                <label>CA</label>
                <input type="text" id="ca">
                <label>Data</label>
                <input type="date" id="data" required>
            </div>
        `;
    } else if (value == "EXPENSE") {
        field.innerHTML = `
        <div id="fieldExpenses" class="fieldExpenses">
        
            <div class="field" id="dynfield">
                <label>Produto</label>
                <input type="text" id="nameExpense" required>
            </div>
            <div class="field dynfield" id="dynfield">
                <label>Emissão</label>
                <input type="date" id="issuedtExpense" required>
                <label>Nota Fiscal</label>
                <input type="text" id="nfExpense" required>
            </div>

            <div class="field dynfield" id="dynfield">
                <label>Empresa</label>
                <input type="text" id="firmExpense" required>
                <label>Quantidade</label>
                <input type="number" id="qttExpense">
            </div>

            <div class="field dynfield" id="dynfield">
                <label>ICMS</label>
                <input type="number" id="icmsExpense" required>
                <label>Valor</label>
                <input type="number" id="valueExpense" required>
            </div>

            <div class="field dynfield" id="dynfield">
                <label>Vencimento</label>
                <input type="date" id="duedtExpense" required>
                <label>Dupl./Boleto</label>
                <select id="duplbolExpense" required>
                    <option value="">Selecione</option>
                    <option value="OK">OK</option>
                </select>
            </div>
            
            <div class="field dynfield" id="dynfield">
                <label>Pagamento</label>
                <select id="pagtoExpense" required>
                    <option value="">Selecione</option>
                    <option value="OK">OK</option>
                </select>
                <label>N. Pedido</label>
                <input type="text" id="orderExpense" required>
            </div>

        </div>
        `;
    }
}