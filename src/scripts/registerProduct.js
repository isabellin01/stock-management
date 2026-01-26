const selectCategory = document.getElementById("categorySel");
const button = document.getElementById("registerButton");

selectCategory.addEventListener("change", (event) => {
    renderCategory(event.target.value);
});

async function renderCategory(value) {
    let companies = '';
    let products = '';

    const field = document.getElementById('dynamicFields');
    if (value == "EPI") {
        let dataCpn = await listCompanies("CLIENT");
        let dataPrd = await listProducts("EPI");

        for (let i = 0; i < dataCpn.length; i++) {
            companies += `<option value="${dataCpn[i].name}">${dataCpn[i].name}</option>`
        }

        for (let i = 0; i < dataPrd.length; i++) {
            products += `<option value="${dataPrd[i].prod_desc}">${dataPrd[i].prod_desc}</option>`
        }

        field.innerHTML = `
        <div id="fieldExpenses" class="fieldExpenses">
            <div class="field dynfield" id="dynfield">
                <label>Produto</label>
                <select id="nameExpense" required>
                    <option value="">Selecione</option>
                    ${products}
                </select>
                <label>CA</label>
                <input type="text" id="ca" required>
            </div>
        `;
    } else if (value == "EXPENSE") {
        let dataCpn = await listCompanies("CLIENT");
        let dataPrd = await listProducts("EXPENSES");

        for (let i = 0; i < dataCpn.length; i++) {
            companies += `<option value="${dataCpn[i].name}">${dataCpn[i].name}</option>`
        }

        for (let i = 0; i < dataPrd.length; i++) {
            products += `<option value="${dataPrd[i].prod_desc}">${dataPrd[i].prod_desc}</option>`
        }

        field.innerHTML = `
        <div id="fieldExpenses" class="fieldExpenses">
            <div class="field" id="dynfield">
                <label>Produto</label>
                <select id="nameExpense" required>
                    <option value="">Selecione</option>
                    ${products}
                </select>
            </div>
        `;
    } else {
        return
    }
    field.innerHTML += `
        <div class="field dynfield" id="dynfield">
            <label>Emissão</label>
            <input type="date" id="issuedtExpense" required>
            <label>Nota Fiscal</label>
            <input type="text" id="nfExpense" required>
        </div>

        <div class="field dynfield" id="dynfield">
            <label>Empresa</label>
            <select id="firmExpense" required>
                <option value="">Selecione</option>
                ${companies}
            </select>
            <label>Quantidade</label>
            <input type="number" id="qttExpense" required>
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
            <select id="duplbolExpense">
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
        </div>
        
        <div class="field dynfield" id="dynfield">
            <label>Pagamento</label>
            <select id="pagtoExpense">
                <option value="">Selecione</option>
                <option value="OK">OK</option>
            </select>
            <label>N. Pedido</label>
            <input type="text" id="orderExpense" required>
        </div>

    </div>
    `;
}
